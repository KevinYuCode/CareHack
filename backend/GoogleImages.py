from dotenv import load_dotenv
from serpapi import GoogleSearch
import os
import string

load_dotenv()


class Images:

    def __init__(self):
        self.params = {
            "tbm": "isch",
            "ijn": "0",
            "api_key": os.getenv("secret-api-key")
        }

    def get_images(self, prompt: string):
        self.params["q"] = prompt
        search = GoogleSearch(self.params)
        results = search.get_dict()
        image_results = results["images_results"]
        images = [sub['thumbnail']
                  for sub in image_results]
        return images


# if __name__ == "__main__":
#     test = Images()
#     images = test.get_images("How to stop addiction")
#     print(images)
