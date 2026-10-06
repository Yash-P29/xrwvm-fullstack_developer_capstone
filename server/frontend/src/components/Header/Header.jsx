import React from "react";
import "../assets/style.css";
import "../assets/bootstrap.min.css";

const Header = () => {
  const currUser = sessionStorage.getItem("username");

  const logout = async (event) => {
    event.preventDefault();
    await fetch("/djangoapp/logout", {method: "GET"});
    sessionStorage.clear();
    window.location.href = "/dealers";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor:"darkturquoise", minHeight:"80px"}}>
      <div className="container-fluid">
        <h2 style={{paddingRight:"5%"}}>Dealerships</h2>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item"><a className="nav-link" href="/dealers">Home</a></li>
          <li className="nav-item"><a className="nav-link" href="/about">About Us</a></li>
          <li className="nav-item"><a className="nav-link" href="/contact">Contact Us</a></li>
        </ul>
        {currUser ? (
          <div className="input_panel">
            <span className="username">{currUser}</span>
            <a className="nav_item" href="/logout" onClick={logout}>Logout</a>
          </div>
        ) : (
          <div className="input_panel">
            <a className="nav_item" href="/login">Login</a>
            <a className="nav_item" href="/register">Register</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
