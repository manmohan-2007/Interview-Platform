import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("Grog_API")

print("API KEY EXISTS:", bool(api_key))

client = Groq(api_key=api_key)

models = client.models.list()

for model in models.data:
    print(model.id)