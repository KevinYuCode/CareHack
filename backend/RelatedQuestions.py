from dotenv import load_dotenv
from serpapi import GoogleSearch
import os
import string

load_dotenv()


class RelatedQuestions:

    def __init__(self):
        self.params = {
            "google_domain": "google.ca",
            "hl": "en",
            "gl": "ca",
            "api_key": os.getenv("secret-api-key"),
            "location": "Canada"
        }

    def get_related_questions(self, prompt: string):
        self.params["q"] = prompt
        search = GoogleSearch(self.params)
        results = search.get_dict()
        if "related_questions" in results:
            related_questions = results["related_questions"]
            RQ_questions = [sub['question']
                            for sub in related_questions]
            return RQ_questions
        else:
            return None

    def get_related_searches(self, prompt: string):
        self.params["q"] = prompt
        search = GoogleSearch(self.params)
        results = search.get_dict()
        if "related_searches" in results:
            related_searches = results["related_searches"]
            RS_query = [sub['query']
                        for sub in related_searches]
            return RS_query
        else:
            return None
