import os
import time
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv

# MongoDB Connection
load_dotenv()
MONGODB_URL = os.getenv("MONGODB_URL")
client = MongoClient(MONGODB_URL)
db = client["leetcodeClone"]
problems_collection = db["problems"]
user_collection = db["user"]

try:
    client.admin.command("ping")
    print("MongoDB Connected Successfully")
except Exception as e:
    print("MongoDB Connection Error:", e)

app = Flask(__name__)

@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:5173"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,DELETE,OPTIONS"
    return response

JUDGE0_URL = "https://ce.judge0.com/submissions"

LANGUAGE_IDS = {
    "cpp": 54,
    "java": 62,
    "python": 71,
    "javascript": 63,
}

# Get Problems List
@app.route("/problems", methods=["GET"])
def get_problems():
    problems = list(problems_collection.find({}, {"_id": 0}))
    response = jsonify(problems)
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:5173")
    return response

# Run Code Endpoint
@app.route('/run_code', methods=["POST", "OPTIONS"])
def run_code():
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS OK"}), 200

    data = request.get_json() or {}

    code = data.get("code")
    language = data.get("language")
    problem_id = data.get("problem_id") 

    if not code or not language or not problem_id:
        return jsonify({"error": "Code, language, and problem_id are required"}), 400

    if language not in LANGUAGE_IDS:  
        return jsonify({"error": "Unsupported language"}), 400

    language_id = LANGUAGE_IDS[language]   

    # MongoDB నుండి ప్రాబ్లం వెతకడం
    problem = problems_collection.find_one({
        "$or": [
            {"problem_id": str(problem_id).strip()},
            {"problem_id": int(problem_id) if str(problem_id).strip().isdigit() else None}
        ]
    })
    
    if not problem:
        return jsonify({"error": f"Problem with ID {problem_id} not found in database"}), 404
        
    db_test_cases = problem.get("test_cases", {}) 
    test_cases = []

    # 'visible' అర్రే ని రీడ్ చేయడం
    if isinstance(db_test_cases, dict) and "visible" in db_test_cases:
        test_cases = db_test_cases["visible"]
    elif isinstance(db_test_cases, list):
        test_cases = db_test_cases

    if not test_cases:
        return jsonify({"error": "No valid test cases found for this problem"}), 400

    all_cases_passed = True
    results_summary = []

    # ప్రతి టెస్ట్ కేస్ ని లూప్ చేసి నేరుగా Judge0 కి పంపడం (No Injection!)
    for index, tc in enumerate(test_cases):
        case_stdin = ""
        expected_output = ""

        if isinstance(tc, dict):
            raw_input = tc.get("input", "")
            if isinstance(raw_input, list):
                case_stdin = "\n".join([str(x) for x in raw_input])
            else:
                case_stdin = str(raw_input)
                
            # 🎯 THE ACTUAL FIX: Clean up literal array formatting strings and split them into 2 separate lines
            case_stdin = case_stdin.replace("list1 =", "").replace("list2 =", "").replace("list1=", "").replace("list2=", "").strip()
            
            # This splits "[1,2,4], [1,3,4]" cleanly into two separate lines for the Java Scanner
            if "]," in case_stdin:
                parts = case_stdin.split("],")
                case_stdin = parts[0].strip() + "]\n" + parts[1].strip()
            elif "],[" in case_stdin:
                parts = case_stdin.split("],[")
                case_stdin = parts[0].strip() + "]\n[" + parts[1].strip()
                
            expected_output = str(tc.get("output", "")).strip()
            expected_output = expected_output.replace("Expected:", "").strip()

            


        # యూజర్ పంపిన కోడ్ ని యాజ్ ఇటీజ్ గా పంపేస్తున్నాం
        response = requests.post(
            JUDGE0_URL,
            json={
                "source_code": code,
                "language_id": language_id,
                "stdin": case_stdin
            },
            timeout=10
        ) 

        if response.status_code != 201:
            return jsonify({"error": f"Failed to submit test case {index+1}"}), 500

        token = response.json()["token"]

        # Polling Logic
        result_data = {}
        while True:
            result = requests.get(f"{JUDGE0_URL}/{token}", params={"base64_encoded": "false"}, timeout=10)
            if result.status_code == 200:
                result_data = result.json()
                status_id = result_data.get("status", {}).get("id")
                if status_id not in[1,2]:
                    break
            time.sleep(0.5)

        actual_stdout = result_data.get("stdout")
        actual_stdout = actual_stdout.strip() if actual_stdout else ""

        is_matched = (actual_stdout == expected_output) and (result_data.get("status", {}).get("id") == 3)

        if not is_matched:
            all_cases_passed = False 

        results_summary.append({
            "test_case": index + 1,
            "stdin": case_stdin,
            "expected": expected_output,
            "actual": actual_stdout,
            "passed": is_matched,
            "status": result_data.get("status", {}).get("description")
        })

    return jsonify({
        "all_passed": all_cases_passed,
        "status": "Accepted" if all_cases_passed else "Wrong Answer",
        "test_results": results_summary
    })


# Create User Endpoint
@app.route("/api/users", methods=["POST", "OPTIONS"])
def create_user():
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS OK"}), 200

    data = request.get_json()
    clerk_id = data.get("clerkId")
    name = data.get("name")
    email = data.get("email")

    print("Received user:", data)

    if not clerk_id or not email:
        return jsonify({"message": "Clerk ID and email are required"}), 400

    existing_user = user_collection.find_one({"clerkId": clerk_id})
    if existing_user:
        return jsonify({"message": "User already exists"}), 200

    user = {"clerkId": clerk_id, "name": name, "email": email}
    user_collection.insert_one(user)

    print("User saved successfully")
    return jsonify({"message": "User created successfully"}), 201

if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5001,
        debug=True,
        use_reloader=False
    )
