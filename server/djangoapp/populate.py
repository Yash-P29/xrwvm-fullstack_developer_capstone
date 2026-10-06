from .models import CarMake, CarModel


def initiate():
    data = [
        ("Nissan", "Japanese automotive technology", [
            ("Pathfinder", "SUV"), ("Qashqai", "SUV"), ("XTRAIL", "SUV")
        ]),
        ("Mercedes", "German automotive technology", [
            ("A-Class", "SEDAN"), ("C-Class", "SEDAN"), ("E-Class", "SEDAN")
        ]),
        ("Audi", "German automotive technology", [
            ("A4", "SEDAN"), ("A5", "COUPE"), ("A6", "SEDAN")
        ]),
        ("Kia", "Korean automotive technology", [
            ("Sorrento", "SUV"), ("Carnival", "MINIVAN"), ("Cerato", "SEDAN")
        ]),
        ("Toyota", "Japanese automotive technology", [
            ("Corolla", "SEDAN"), ("Camry", "SEDAN"), ("Kluger", "SUV")
        ]),
    ]

    for make_name, description, models in data:
        make, _ = CarMake.objects.get_or_create(
            name=make_name,
            defaults={"description": description}
        )
        for model_name, car_type in models:
            CarModel.objects.get_or_create(
                car_make=make,
                name=model_name,
                defaults={"dealer_id": 1, "type": car_type, "year": 2023}
            )
