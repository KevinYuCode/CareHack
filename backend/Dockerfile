# start by pulling the python image
FROM python:3.9-slim-buster

WORKDIR /qhacks-2023

# copy the requirements file into the image
COPY requirements.txt .

# install the dependencies and packages in the requirements file
RUN pip install -r requirements.txt

# copy every content from the local file to the image
COPY . .

CMD ["python", "server.py"]
EXPOSE 5000
