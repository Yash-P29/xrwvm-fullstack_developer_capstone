import os
from urllib.parse import quote

import requests
from dotenv import load_dotenv

load_dotenv()

backend_url = os.getenv("backend_url", "http://localhost:3030").rstrip("/")
sentiment_analyzer_url = os.getenv(
    "sentiment_analyzer_url", "http://localhost:5050"
).rstrip("/")


def get_request(endpoint, **kwargs):
    params = {key: str(value) for key, value in kwargs.items()}
    request_url = backend_url + endpoint
    try:
        response = requests.get(request_url, params=params, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as exc:
        print(f"GET request failed: {exc}")
        return []


def analyze_review_sentiments(text):
    request_url = sentiment_analyzer_url + "/analyze/" + quote(text, safe="")
    try:
        response = requests.get(request_url, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as exc:
        print(f"Sentiment request failed: {exc}")
        return {"sentiment": "neutral"}


def post_review(data_dict):
    request_url = backend_url + "/insert_review"
    response = requests.post(request_url, json=data_dict, timeout=10)
    response.raise_for_status()
    return response.json()
