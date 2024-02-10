import os
import random
from flask import Flask, request
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
from roleplay import main

load_dotenv()
app = Flask(__name__, static_url_path="", static_folder='./build', template_folder='build')
cors = CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SECRET_KEY'] =  os.getenv("secret_key")


@app.route("/", methods=["GET"])
def frontend():
    return app.send_static_file('index.html')

@app.route("/init", methods=["GET"])
def get_init():
    return {"response": main()}

# Generic route to prompt GPT and return response
# Requires: json data: {"prompt" : "A chatGPT prompt"}
@app.route("/response", methods=["POST"])
@cross_origin()
def get_response():
    prompt = request.json['prompt']
    res = None
    # Call whatever function to prompt GPT
    return {"response" : res}


# To return a random tip during loading
@app.route("/loading", methods=["GET"])
@cross_origin()
def get_loading_prompts():
    tips = [
        "Every step you take in this training brings you closer to mastery.",
        "Embrace the learning process; it's the foundation of expertise.",
        "In every challenge, there is an opportunity to enhance your skills.",
        "Your dedication to learning today shapes the healthcare of tomorrow.",
        "Success in patient care begins with continuous learning and improvement.",
        "Take pride in your commitment to becoming a more proficient medical professional.",
        "The journey to excellence is paved with persistence and knowledge.",
        "Knowledge is the key that unlocks the doors to exceptional healthcare.",
        "Your efforts today will positively impact the lives you touch tomorrow."
    ]
    
    return {"tip": tips[random.randint(0, 8)]}


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
