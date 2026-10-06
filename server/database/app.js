const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const cors = require("cors");

const app = express();
const port = 3030;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const dataDir = __dirname + "/data";
const reviews_data = JSON.parse(fs.readFileSync(dataDir + "/reviews.json", "utf8"));
const dealerships_data = JSON.parse(fs.readFileSync(dataDir + "/dealerships.json", "utf8"));

mongoose.connect("mongodb://mongo_db:27017/", { dbName: "dealershipsDB" });

const Reviews = require("./review");
const Dealerships = require("./dealership");

mongoose.connection.once("open", async () => {
  try {
    await Reviews.deleteMany({});
    await Reviews.insertMany(reviews_data.reviews);
    await Dealerships.deleteMany({});
    await Dealerships.insertMany(dealerships_data.dealerships);
    console.log("MongoDB seed data loaded.");
  } catch (error) {
    console.error("Error loading seed data:", error);
  }
});

app.get("/", (req, res) => res.send("Welcome to the Mongoose API"));

app.get("/fetchReviews", async (req, res) => {
  try {
    res.json(await Reviews.find());
  } catch (error) {
    res.status(500).json({ error: "Error fetching documents" });
  }
});

app.get("/fetchReviews/dealer/:id", async (req, res) => {
  try {
    res.json(await Reviews.find({ dealership: Number(req.params.id) }));
  } catch (error) {
    res.status(500).json({ error: "Error fetching documents" });
  }
});

app.get("/fetchDealers", async (req, res) => {
  try {
    res.json(await Dealerships.find());
  } catch (error) {
    res.status(500).json({ error: "Error fetching documents" });
  }
});

app.get("/fetchDealers/:state", async (req, res) => {
  try {
    res.json(await Dealerships.find({ state: req.params.state }));
  } catch (error) {
    res.status(500).json({ error: "Error fetching documents" });
  }
});

app.get("/fetchDealer/:id", async (req, res) => {
  try {
    res.json(await Dealerships.find({ id: Number(req.params.id) }));
  } catch (error) {
    res.status(500).json({ error: "Error fetching documents" });
  }
});

app.post("/insert_review", async (req, res) => {
  try {
    const latest = await Reviews.findOne().sort({ id: -1 });
    const newId = latest ? latest.id + 1 : 1;

    const review = await Reviews.create({
      id: newId,
      name: req.body.name,
      dealership: Number(req.body.dealership),
      review: req.body.review,
      purchase: Boolean(req.body.purchase),
      purchase_date: req.body.purchase_date,
      car_make: req.body.car_make,
      car_model: req.body.car_model,
      car_year: Number(req.body.car_year),
    });

    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error inserting review" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
