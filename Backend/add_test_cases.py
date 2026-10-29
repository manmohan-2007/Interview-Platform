from pymongo import MongoClient
from dotenv import load_dotenv
import os
import re

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL")

client = MongoClient(MONGODB_URL)

db = client["leetcodeClone"]
problems_collection = db["problems"]


def extract_test_cases(examples):
    visible = []

    for example in examples:
        text = example.get("example_text", "")

        input_match = re.search(
            r"Input:\s*(.*?)(?:\nOutput:|$)",
            text,
            re.DOTALL
        )

        output_match = re.search(
            r"Output:\s*(.*?)(?:\nExplanation:|$)",
            text,
            re.DOTALL
        )

        if input_match and output_match:
            visible.append({
                "input": input_match.group(1).strip(),
                "output": output_match.group(1).strip()
            })

    return visible


problems = problems_collection.find({})

count = 0

for problem in problems:

    examples = problem.get("examples", [])

    if not examples:
        continue

    visible_cases = extract_test_cases(examples)

    if not visible_cases:
        continue

    problems_collection.update_one(
        {
            "_id": problem["_id"]
        },
        {
            "$set": {
                "test_cases.visible": visible_cases,
                "test_cases.hidden": []
            }
        }
    )

    count += 1

    print(
        f"Added test cases → "
        f"Problem {problem.get('problem_id')}"
    )


print("\n-------------------------")
print(f"Updated problems: {count}")
print("-------------------------")

client.close()