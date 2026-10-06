import React, { useEffect, useState } from "react";
import "./Dealers.css";
import "../assets/style.css";
import Header from "../Header/Header";
import reviewIcon from "../assets/reviewicon.png";

const Dealers = () => {
  const [dealers, setDealers] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("All");

  const loadDealers = async (state = "All") => {
    const endpoint = state === "All"
      ? "/djangoapp/get_dealers"
      : "/djangoapp/get_dealers/" + encodeURIComponent(state);
    const response = await fetch(endpoint);
    const result = await response.json();
    if (result.status === 200) {
      setDealers(result.dealers || []);
      if (state === "All") {
        setStates([...new Set((result.dealers || []).map((d) => d.state))].sort());
      }
    }
  };

  useEffect(() => { loadDealers(); }, []);

  const loggedIn = Boolean(sessionStorage.getItem("username"));

  return (
    <div>
      <Header />
      <div className="dealer_page">
        <h1>Our Dealerships</h1>
        <div className="filter_row">
          <label htmlFor="state">Filter by State:</label>
          <select id="state" value={selectedState}
            onChange={(e) => { setSelectedState(e.target.value); loadDealers(e.target.value); }}>
            <option value="All">All States</option>
            {states.map((state) => <option key={state} value={state}>{state}</option>)}
          </select>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead><tr>
              <th>ID</th><th>Dealer Name</th><th>City</th><th>Address</th>
              <th>Zip</th><th>State</th>{loggedIn && <th>Review Dealer</th>}
            </tr></thead>
            <tbody>
              {dealers.map((dealer) => (
                <tr key={dealer.id}>
                  <td>{dealer.id}</td>
                  <td><a href={`/dealer/${dealer.id}`}>{dealer.full_name}</a></td>
                  <td>{dealer.city}</td><td>{dealer.address}</td><td>{dealer.zip}</td><td>{dealer.state}</td>
                  {loggedIn && (
                    <td>
                      <a href={`/postreview/${dealer.id}`}><img src={reviewIcon} className="review_icon" alt="Review Dealer" /></a>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dealers;
