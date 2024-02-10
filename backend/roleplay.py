import openai
from dotenv import load_dotenv
import os
import re
# from openai import OpenAI

# Load environment variables from .env file
load_dotenv()

# Get the OpenAI API key
openai_key = os.getenv("OPENAI_KEY")

def disease_symptoms():

    msg = "Pretend to be a patient with a disease and give me a list of 10 symptoms in detailed sentences. Don't specify the symptom of the beginning. Give me this in the format: 'Disease: Symptoms: '"
    # msg = "'Disease: Lyme Disease, Symptoms:', '1. I have a circular red rash on my skin that keeps expanding.', '2. My joints are constantly throbbing and painful.', Answer this question from the perspective of you being the patient: Do you have lyme disease?"

    openai.api_key =openai_key

    response = openai.Completion.create(
        engine="gpt-3.5-turbo-instruct",
        prompt=msg,
        max_tokens=1000
    )

    res = response['choices'][0]['text']
    res_array = res.split('\n')
    res_array = [step.strip() for step in res_array if step.strip()]

    symptoms_list = []
    for text in res_array[1:]:
        pattern = r"\d+\.\s*(.*)"
        # Search for the pattern in the text
        matches = re.search(pattern, text)
        # Extract the symptom description
        if matches:
            symptom = matches.group(1)
            symptoms_list.append(symptom)

    pattern = r"Disease: (.*?)(?: Symptoms|$)"
    match = re.search(pattern, res_array[0])
    if match:
        disease = match.group(1)
    else:
        disease = res_array[0]
    return symptoms_list, disease


def questions(symptoms, question):
    
    openai.api_key =openai_key

    msg = str(symptoms) + "Answer this question from the perspective of you being the patient, pretend to take a persona of someone with these symptoms (Don't say the disease in your answer): " + question

    response = openai.Completion.create(
        engine="gpt-3.5-turbo-instruct",
        prompt=msg,
        max_tokens=1000
    )

    res = response['choices'][0]['text']
    # res_array = res.split('\n')
    # res_array = [step.strip() for step in res_array if step.strip()]
    return res


if __name__ == '__main__':
    # msg = "Say this is a test"
    symptoms, disease = disease_symptoms()
    print("symptoms:", symptoms)
    print("\ndisease:", disease)
    
    response = questions(symptoms, "Is your skin blue?")
    print(response)