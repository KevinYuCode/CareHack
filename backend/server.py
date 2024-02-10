import os
import random
from flask import Flask, request
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
from Instructions import prompt_response
from RelatedQuestions import RelatedQuestions
from concurrent.futures import ThreadPoolExecutor

load_dotenv()
app = Flask(__name__, static_url_path="", static_folder='./build', template_folder='build')
cors = CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SECRET_KEY'] =  os.getenv("secret_key")


@app.route("/", methods=["GET"])
def frontend():
    return app.send_static_file('index.html')

# To call OpenAI API
# Requires: json data: {"prompt" : "A chatGPT prompt"}
@app.route("/response", methods=["POST"])
@cross_origin()
def get_response():
    # Use prompt to call OpenAI API
    prompt = request.json['prompt']
    res = prompt_response("Write a long detailed list answer to the question:" + prompt)
    return {"response" : res}



# To get suggestions and their contents
@app.route("/suggestions", methods=["POST"])
@cross_origin()
def get_suggestions():
    # Call Google suggestion API
    prompt = request.json['prompt']
    suggest = RelatedQuestions()
    prompt = request.json['prompt']
    related_questions = suggest.get_related_questions(prompt)
    related_searches = suggest.get_related_searches(prompt)
    
    # Add stuff to list depending on if we got results from the API or not
    suggestions = []
    if related_questions and related_searches:
            suggestions += related_questions + related_searches
    elif related_searches:
        suggestions += related_searches
    elif related_questions:
        suggestions += related_questions

    # Call OpenAI API in parallel for each suggestion
    pool = ThreadPoolExecutor(max_workers=4)

    # We don't want to call OpenAI more than 4 times, so limit the list length
    if len(suggestions) <= 4:
        # This returns a list in order after all tasks are complete
        results = list(pool.map(prompt_response, suggestions))
    else:
        results = list(pool.map(prompt_response, suggestions[:4]))

    # Match titles to thread results
    res = []
    suggestions_res = {"suggestions": res}

    for i in range(len(results)):
        res.append({
            "title": suggestions[i],
            "description": results[i]
        })

    # Jsonify and return as arrays of answers
    return suggestions_res


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
