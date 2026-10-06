from django.db import migrations, models
import django.core.validators
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True
    dependencies = []

    operations = [
        migrations.CreateModel(
            name="CarMake",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=100)),
                ("description", models.TextField()),
                ("country", models.CharField(blank=True, max_length=100, null=True)),
                ("established_year", models.IntegerField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name="CarModel",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("dealer_id", models.IntegerField()),
                ("name", models.CharField(max_length=100)),
                ("type", models.CharField(choices=[
                    ("SEDAN","Sedan"),("SUV","SUV"),("WAGON","Wagon"),("COUPE","Coupe"),
                    ("HATCHBACK","Hatchback"),("CONVERTIBLE","Convertible"),("TRUCK","Truck"),
                    ("PICKUP","Pickup"),("MINIVAN","Minivan")], default="SEDAN", max_length=20)),
                ("year", models.IntegerField(validators=[
                    django.core.validators.MinValueValidator(2015),
                    django.core.validators.MaxValueValidator(2023)])),
                ("color", models.CharField(blank=True, max_length=50, null=True)),
                ("mileage", models.IntegerField(blank=True, null=True)),
                ("car_make", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE,
                    related_name="car_models", to="djangoapp.carmake")),
            ],
        ),
    ]
