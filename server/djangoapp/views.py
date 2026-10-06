from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
import json
import logging

from django.views.decorators.csrf import csrf_exempt

from .models import CarMake, CarModel
from .populate import initiate
from .restapis import get_request, analyze_review_sentiments, post_review

logger = logging.getLogger(__name__)


@csrf_exempt
def login_user(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST required"}, status=405)
    try:
        data = json.loads(request.body)
        username = data.get("userName", "").strip()
        password = data.get("password", "")
    except (json.JSONDecodeError, AttributeError):
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    user = authenticate(username=username, password=password)
    if user is None:
        return JsonResponse(
            {"userName": username, "status": "Not Authenticated"}, status=401
        )

    login(request, user)
    return JsonResponse({
        "userName": username,
        "firstName": user.first_name,
        "lastName": user.last_name,
        "status": "Authenticated",
    })


@csrf_exempt
def logout_request(request):
    logout(request)
    return JsonResponse({"userName": ""})


@csrf_exempt
def registration(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST required"}, status=405)
    try:
        data = json.loads(request.body)
    except (json.JSONDecodeError, AttributeError):
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    username = data.get("userName", "").strip()
    password = data.get("password", "")
    first_name = data.get("firstName", "").strip()
    last_name = data.get("lastName", "").strip()
    email = data.get("email", "").strip()

    if not all([username, password, first_name, last_name, email]):
        return JsonResponse({"error": "All fields are required"}, status=400)

    if User.objects.filter(username=username).exists():
        return JsonResponse(
            {"userName": username, "error": "Already Registered"}, status=409
        )

    user = User.objects.create_user(
        username=username,
        first_name=first_name,
        last_name=last_name,
        password=password,
        email=email,
    )
    login(request, user)
    return JsonResponse({
        "userName": username,
        "firstName": first_name,
        "lastName": last_name,
        "status": "Authenticated",
    })


def get_dealerships(request, state="All"):
    endpoint = "/fetchDealers" if state == "All" else "/fetchDealers/" + state
    dealerships = get_request(endpoint)
    return JsonResponse({"status": 200, "dealers": dealerships})


def get_dealer_reviews(request, dealer_id):
    if not dealer_id:
        return JsonResponse({"status": 400, "message": "Bad Request"}, status=400)

    reviews = get_request("/fetchReviews/dealer/" + str(dealer_id))
    for review in reviews:
        sentiment = analyze_review_sentiments(review.get("review", ""))
        review["sentiment"] = sentiment.get("sentiment", "neutral")
    return JsonResponse({"status": 200, "reviews": reviews})


def get_dealer_details(request, dealer_id):
    if not dealer_id:
        return JsonResponse({"status": 400, "message": "Bad Request"}, status=400)
    dealership = get_request("/fetchDealer/" + str(dealer_id))
    return JsonResponse({"status": 200, "dealer": dealership})


@csrf_exempt
def add_review(request):
    if request.user.is_anonymous:
        return JsonResponse({"status": 403, "message": "Unauthorized"}, status=403)
    if request.method != "POST":
        return JsonResponse({"status": 405, "message": "POST required"}, status=405)

    try:
        data = json.loads(request.body)
        required = [
            "name", "dealership", "review", "purchase",
            "purchase_date", "car_make", "car_model", "car_year"
        ]
        if not all(key in data for key in required):
            return JsonResponse(
                {"status": 400, "message": "Missing review fields"}, status=400
            )
        post_review(data)
        return JsonResponse({"status": 200})
    except (json.JSONDecodeError, TypeError):
        return JsonResponse({"status": 400, "message": "Invalid review data"}, status=400)
    except Exception as exc:
        logger.exception("Error posting review: %s", exc)
        return JsonResponse(
            {"status": 500, "message": "Error in posting review"}, status=500
        )


def get_cars(request):
    if not CarMake.objects.exists():
        initiate()

    cars = [
        {"CarModel": car_model.name, "CarMake": car_model.car_make.name}
        for car_model in CarModel.objects.select_related("car_make")
    ]
    return JsonResponse({"CarModels": cars})
