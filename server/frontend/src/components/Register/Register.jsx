import React, { useState } from "react";
import "./Register.css";
import userIcon from "../assets/person.png";
import emailIcon from "../assets/email.png";
import passwordIcon from "../assets/password.png";
import closeIcon from "../assets/close.png";

const Register = () => {
  const [form, setForm] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const update = (field) => (event) =>
    setForm((current) => ({ ...current, [field]: event.target.value }));

  const register = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/djangoapp/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json();

      if (response.ok && result.status === "Authenticated") {
        sessionStorage.setItem("username", result.userName);
        sessionStorage.setItem("firstname", result.firstName);
        sessionStorage.setItem("lastname", result.lastName);
        window.location.href = "/dealers";
      } else {
        alert(result.error || "Registration failed.");
      }
    } catch (error) {
      alert("Unable to reach the registration service.");
    }
  };

  return (
    <div className="register_container" style={{ width: "50%" }}>
      <div className="header">
        <span className="text">Sign Up</span>
        <a href="/" aria-label="Close">
          <img style={{ width: "1cm" }} src={closeIcon} alt="Close" />
        </a>
      </div>

      <form onSubmit={register}>
        <div className="inputs">
          <div className="input">
            <img src={userIcon} className="img_icon" alt="Username" />
            <input required type="text" placeholder="Username" onChange={update("userName")} />
          </div>
          <div className="input">
            <img src={userIcon} className="img_icon" alt="First Name" />
            <input required type="text" placeholder="First Name" onChange={update("firstName")} />
          </div>
          <div className="input">
            <img src={userIcon} className="img_icon" alt="Last Name" />
            <input required type="text" placeholder="Last Name" onChange={update("lastName")} />
          </div>
          <div className="input">
            <img src={emailIcon} className="img_icon" alt="Email" />
            <input required type="email" placeholder="Email" onChange={update("email")} />
          </div>
          <div className="input">
            <img src={passwordIcon} className="img_icon" alt="Password" />
            <input required minLength="6" type="password" placeholder="Password" onChange={update("password")} />
          </div>
        </div>
        <div className="submit_panel">
          <input className="submit" type="submit" value="Register" />
        </div>
      </form>
    </div>
  );
};

export default Register;
