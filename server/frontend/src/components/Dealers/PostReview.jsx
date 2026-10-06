import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Dealers.css";
import "../assets/style.css";
import Header from "../Header/Header";

const PostReview = () => {
  const { id } = useParams();
  const [dealer, setDealer] = useState({});
  const [review, setReview] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");
  const [cars, setCars] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch(`/djangoapp/dealer/${id}`).then((r) => r.json()),
      fetch("/djangoapp/get_cars").then((r) => r.json()),
    ]).then(([dealerResult, carResult]) => {
      setDealer((dealerResult.dealer || [])[0] || {});
      setCars(carResult.CarModels || []);
    });
  }, [id]);

  const postReview = async () => {
    if (!review.trim() || !model || !date || !year) {
      alert("All details are mandatory.");
      return;
    }

    const [make, ...modelParts] = model.split(" ");
    const modelName = modelParts.join(" ");
    const first = sessionStorage.getItem("firstname");
    const last = sessionStorage.getItem("lastname");
    const name = first && last ? `${first} ${last}` : sessionStorage.getItem("username");

    const response = await fetch("/djangoapp/add_review", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        name, dealership: id, review, purchase: true,
        purchase_date: date, car_make: make, car_model: modelName, car_year: year
      }),
    });
    const result = await response.json();

    if (response.ok && result.status === 200) {
      window.location.href = `/dealer/${id}`;
    } else {
      alert(result.message || "Error posting review.");
    }
  };

  return (
    <div>
      <Header />
      <div className="post_review_page">
        <h1>{dealer.full_name}</h1>
        <label htmlFor="review">Your Review</label>
        <textarea id="review" rows="7" value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Tell us about your dealership experience..." />

        <label>Purchase Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

        <label>Car Make and Model</label>
        <select value={model} onChange={(e) => setModel(e.target.value)}>
          <option value="">Choose Car Make and Model</option>
          {cars.map((car) => (
            <option key={`${car.CarMake}-${car.CarModel}`} value={`${car.CarMake} ${car.CarModel}`}>
              {car.CarMake} {car.CarModel}
            </option>
          ))}
        </select>

        <label>Car Year</label>
        <input type="number" min="2015" max="2023" value={year}
          onChange={(e) => setYear(e.target.value)} />

        <button className="postreview" onClick={postReview}>Post Review</button>
      </div>
    </div>
  );
};

export default PostReview;
