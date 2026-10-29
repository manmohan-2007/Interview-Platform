import os
import certifi

os.environ["SSL_CERT_FILE"] = certifi.where()
os.environ["REQUESTS_CA_BUNDLE"] = certifi.where()



from flask import Flask,request,jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from langchain_groq import ChatGroq
# from langchain.chat_models import init_chat_model
from langgraph.checkpoint.memory import InMemorySaver
from langchain.agents import create_agent
import assemblyai as aai
import os
import base64
import requests
import tempfile
import json


load_dotenv()


Grog_API = os.getenv("Grog_API")

print("GROQ KEY EXISTS:", bool(Grog_API))
MURF_API_KEY= os.getenv("MURF_API_KEY")
ASSEMBLYAI_API_KEY = os.getenv("ASSEMBLYAI_API_KEY")
aai.settings.api_key = ASSEMBLYAI_API_KEY
checkpointer = InMemorySaver()

model = ChatGroq(
  model="openai/gpt-oss-120b",  # leda meeku kavalsina Groq model
    api_key=Grog_API,
    temperature=0
)

agent = create_agent(
    model=model,
    tools=[],
    checkpointer=checkpointer
)

question_count = 0
current_subject = ""
thread_id = "interview_session"

INTERVIEW_PROMPT = """
You are Natalie, an experienced technical interviewer.

Conduct a professional interview on {subject}.

Rules:
1. Ask exactly 5 interview questions.
2. Start with an easy question and gradually increase difficulty.
3. After each answer, briefly acknowledge it in one sentence.
4. Then ask exactly ONE new interview question.
5. Never repeat the candidate's answer.
6. Never ask about greetings or casual conversation.
7. Keep every response under two sentences.
"""


FEEDBACK_PROMPT = """Based on our complete interview conversation, provide detailed feedback.
IMPORTANT: You MUST respond with ONLY a valid JSON object. No other text before or after.
Address the candidate directly using "you" and "your" (e.g., "You explained..." not "The candidate explained...").
Respond with ONLY this JSON structure (no markdown, no code blocks, no extra text):
{{
    "subject": "{subject}",
    "candidate_score": <1-5>,
    "feedback": "<detailed strengths with specific examples from their ACTUAL answers>",
    "areas_of_improvement": "<constructive suggestions based on gaps you noticed>"
}}
Be specific - reference ACTUAL things they said during the interview."""



app = Flask(__name__)
CORS(app)

def generate_audio_base64(text):
    BASE_URL = "https://global.api.murf.ai/v1/speech/stream"

    payload = {
        "text": text,
        "voiceId": "en-US-natalie",
        "model": "FALCON",
        "multiNativeLocale": "en-US",
        "sampleRate": 24000,
        "format": "MP3",
    }

    headers = {
        "Content-Type": "application/json",
        "api-key": MURF_API_KEY,
    }

    response = requests.post(
        BASE_URL,
        headers=headers,
        data=json.dumps(payload),
        stream=True,
    )
    response.raise_for_status()

    audio_base64 = ""

    for chunk in response.iter_content(chunk_size=4096):
        if chunk:
            audio_base64 += base64.b64encode(chunk).decode("utf-8")

    return audio_base64




@app.route("/start-interview", methods=["POST"])
def start_interview():
    global question_count, current_subject, checkpointer, agent

    try:
        print("========== START INTERVIEW ==========")

        data = request.get_json()
        print("DATA:", data)

        current_subject = data.get("subject", "Python")
        print("SUBJECT:", current_subject)

        question_count = 1

        checkpointer = InMemorySaver()

        agent = create_agent(
            model=model,
            tools=[],
            checkpointer=checkpointer
        )

        print("AGENT CREATED")

        config = {
            "configurable": {
                "thread_id": thread_id
            }
        }

        formatted_prompt = INTERVIEW_PROMPT.format(
            subject=current_subject
        )

        print("BEFORE AGENT")

        response = agent.invoke(
            {
                "messages": [
                    {
                        "role": "system",
                        "content": formatted_prompt
                    },
                    {
                        "role": "user",
                        "content": f"Start the interview with a warm greeting and ask the first question about {current_subject}. Keep it SHORT (1-2 sentences)."
                    }
                ]
            },
            config=config
        )

        print("AFTER AGENT")

        question = response["messages"][-1].content

        print("QUESTION:", question)

        audio_base64 = generate_audio_base64(question)

        print("AFTER MURF")

        return jsonify({
            "question": question,
            "audio": audio_base64
        })

    except Exception as e:
        print("========== ERROR ==========")
        print(type(e).__name__)
        print(str(e))
        print("===========================")

        return jsonify({
            "error": str(e)
        }), 500
def speech_to_text(audio_path):
  """Convert audio file to text using AssemblyAI"""
  transcriber = aai.Transcriber()
#   config = aai.TranscriptionConfig(
#         speech_models=["universal-3-5-pro", "universal-2"],
#         language_detection=True, speaker_labels=True,
#     )
  transcript = transcriber.transcribe(audio_path)
  return transcript.text if transcript.text else ""


@app.route("/submit-answer", methods=["POST"])
def submit_answer():
    global question_count

    audio_file = request.files["audio"]

    temp_path = tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".webm"
    ).name

    audio_file.save(temp_path)

    answer = speech_to_text(temp_path)

    os.unlink(temp_path)

    if not answer:
        answer = "No response"

    print(f"\n========== ANSWER {question_count} ==========")
    print(answer)

    config = {"configurable": {"thread_id": thread_id}}

    # Store candidate answer in conversation history
    agent.invoke(
        {
            "messages": [
                {
                    "role": "user",
                    "content": answer
                }
            ]
        },
        config=config
    )

    # Interview completed after 5 answers
    if question_count >= 5:
        return jsonify({
            "completed": True
        })

    question_count += 1

    response = agent.invoke(
        {
            "messages": [
                {
                    "role": "user",
                    "content": f"""
                           You are conducting a {current_subject} interview.

                           The candidate's latest answer is:

                           "{answer}"

                           Briefly acknowledge the answer in ONE short sentence.

                           Then ask Question {question_count} of 5.

                           Rules:
                           - Ask only ONE interview question.
                           - Don't repeat the candidate's answer.
                           - Don't explain your thinking.
                           - Don't ask two questions.
                           - Keep the total response under 2 sentences.
                               """
                 }
         ]
        },
        config=config
    )

    question = response["messages"][-1].content.strip()

    print(f"\n========== QUESTION {question_count} ==========")
    print(question)

    audio_base64 = generate_audio_base64(question)

    return jsonify({
        "question": question,
        "audio": audio_base64,
        "questionNumber": question_count
    })   



@app.route("/get-feedback", methods=["POST"])
def get_feedback():
    """Generate detailed interview feedback"""
    config = {"configurable": {"thread_id": thread_id}}
    response = agent.invoke({
        "messages": [
        {
            "role": "user", 
            "content": f"{FEEDBACK_PROMPT}\n\nReview our complete {current_subject} interview conversation and provide detailed feedback."
        }
        ]
    }, config=config)
    text = response["messages"][-1].content
    print(f"\n[Feedback Generated]\n{text}\n")
    cleaned = text.strip()
    if "```" in cleaned:
        cleaned = cleaned.split("```")[1].replace("json", "").strip()
    try:
       feedback = json.loads(cleaned)
    except json.JSONDecodeError:
       return jsonify({
           "success": False,
           "message": "Invalid feedback generated"
       }), 500

    return jsonify({"success": True, "feedback": feedback})


app.run(debug=True, port=5000)

