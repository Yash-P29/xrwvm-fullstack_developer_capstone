import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Dealers.css";
import "../assets/style.css";
import positiveIcon from "../assets/positive.png";
import neutralIcon from "../assets/neutral.png";
import negativeIcon from "../assets/negative.png";
import reviewIcon from "../assets/reviewbutton.png";
import Header from "../Header/Header";

const Dealer = () => {
  const { id } = useParams();
  const [dealer, setDealer] = useState({});
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [dealerResponse, reviewResponse] = await Promise.all([
        fetch(`/djangoapp/dealer/${id}`),
        fetch(`/djangoapp/reviews/dealer/${id}`),
      ]);
      const dealerResult = await dealerResponse.json();
      const reviewResult = await reviewResponse.json();
      setDealer((dealerResult.dealer || [])[0] || {});
      setReviews(reviewResult.reviews || []);
      setLoading(false);
    };
    load();
  }, [id]);

  const icon = (sentiment) =>
    sentiment === "positive" ? positiveIcon :
    sentiment === "negative" ? negativeIcon : neutralIcon;

  return (
    <div style={{margin:"20px"}}>
      <Header />
      <div className="dealer_detail_header">
        <h1>{dealer.full_name || "Dealer"}</h1>
        <h4>{dealer.city}, {dealer.address}, Zip - {dealer.zip}, {dealer.state}</h4>
        {sessionStorage.getItem("username") && (
          <a href={`/postreview/${id}`}>
            <img src={reviewIcon} className="review_icon" alt="Post Review" />
            <span> Review Dealer</span>
          </a>
        )}
      </div>

      <div className="reviews_panel">
        {loading ? <p>Loading Reviews...</p> :
         reviews.length === 0 ? <p>No reviews yet!</p> :
         reviews.map((review) => (
          <div className="review_panel" key={review.id}>
            <img src={icon(review.sentiment)} className="emotion_icon" alt={review.sentiment} />
            <div className="review">{review.review}</div>
            <div className="reviewer">
              {review.name} · {review.car_make} {review.car_model} {review.car_year}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dealer;
