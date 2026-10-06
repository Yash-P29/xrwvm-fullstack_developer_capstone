from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


class CarMake(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    country = models.CharField(max_length=100, blank=True, null=True)
    established_year = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.name


class CarModel(models.Model):
    CAR_TYPES = [
        ("SEDAN", "Sedan"),
        ("SUV", "SUV"),
        ("WAGON", "Wagon"),
        ("COUPE", "Coupe"),
        ("HATCHBACK", "Hatchback"),
        ("CONVERTIBLE", "Convertible"),
        ("TRUCK", "Truck"),
        ("PICKUP", "Pickup"),
        ("MINIVAN", "Minivan"),
    ]

    car_make = models.ForeignKey(
        CarMake, on_delete=models.CASCADE, related_name="car_models"
    )
    dealer_id = models.IntegerField()
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=20, choices=CAR_TYPES, default="SEDAN")
    year = models.IntegerField(
        validators=[MinValueValidator(2015), MaxValueValidator(2023)]
    )
    color = models.CharField(max_length=50, blank=True, null=True)
    mileage = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return f"{self.car_make.name} {self.name} ({self.year})"
