import React, { useState } from "react";
import "./Login.css";
import Header from "../Header/Header";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/djangoapp/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({userName, password}),
      });
      const json = await res.json();

      if (res.ok && json.status === "Authenticated") {
        sessionStorage.setItem("username", json.userName);
        sessionStorage.setItem("firstname", json.firstName || "");
        sessionStorage.setItem("lastname", json.lastName || "");
        window.location.href = "/dealers";
      } else {
        alert("The user could not be authenticated.");
      }
    } catch (error) {
      alert("Unable to reach the login service.");
    }
  };

  return (
    <div>
      <Header />
      <div className="modalContainer">
        <form className="login_panel" onSubmit={login}>
          <div>
            <span className="input_field">Username </span>
            <input required type="text" placeholder="Username"
              className="input_field" onChange={(e) => setUserName(e.target.value)} />
          </div>
          <div>
            <span className="input_field">Password </span>
            <input required type="password" placeholder="Password"
              className="input_field" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <input className="action_button" type="submit" value="Login" />
            <input className="action_button" type="button" value="Cancel"
              onClick={() => (window.location.href = "/dealers")} />
          </div>
          <a className="loginlink" href="/register">Register Now</a>
        </form>
      </div>
    </div>
  );
};

export default Login;
