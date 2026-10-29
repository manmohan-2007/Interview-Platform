from pymongo import MongoClient
from dotenv import load_dotenv
import os
import json
from pathlib import Path

# Load .env
load_dotenv()

# MongoDB connection
MONGODB_URL = os.getenv("MONGODB_URL")

if not MONGODB_URL:
    raise ValueError("MONGODB_URL not found in .env")

client = MongoClient(MONGODB_URL)

# Database
db = client["leetcodeClone"]

# Collection
collection = db["problems"]

# JSON files folder
PROBLEMS_FOLDER = Path(
    r"C:\Users\PAGOTI MAN MOHAN\Downloads\problems\problems"
)

# Get JSON files
json_files = sorted(PROBLEMS_FOLDER.glob("*.json"))

print("Total JSON files found:", len(json_files))

# First 200 problems
selected_files = json_files[:200]

problems = []

for file in selected_files:

    try:
        with open(file, "r", encoding="utf-8") as f:
            data = json.load(f)

        problems.append(data)

    except Exception as e:
        print("Error reading:", file.name)
        print(e)

# Insert into MongoDB
if problems:
    result = collection.insert_many(problems)

    print(
        f"{len(result.inserted_ids)} problems inserted successfully!"
    )
else:
    print("No problems found.")

client.close()