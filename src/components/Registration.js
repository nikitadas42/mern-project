import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Registration.css";

function Registration() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState(false);
  const navigation = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const validatePassword = (newPassword) => {
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
    } else if (!/\d/.test(newPassword)) {
      setPasswordError("Password must contain at least one digit.");
    } else if (!/[a-z]/.test(newPassword)) {
      setPasswordError("Password must contain at least one lowercase letter.");
    } else if (!/[A-Z]/.test(newPassword)) {
      setPasswordError("Password must contain at least one uppercase letter.");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const storedUsername = sessionStorage.getItem("registeredUsername");
    const storedPassword = sessionStorage.getItem("registeredPassword");

    if (username === storedUsername && password === storedPassword) {
      setRegistrationError(true); // Display error if already registered
    } else if (!passwordError) {
      sessionStorage.setItem("registeredUsername", username);
      sessionStorage.setItem("registeredPassword", password);
      setShowSuccess(true);
      setRegistrationError(false);
    }
  };

  const closePopup = () => {
    setShowSuccess(false);
    navigation("/login");
  };

  return (
    <div className="App">
      <div className="container">
        <form onSubmit={handleSubmit} className="registration-form">
          <h2>Registration Form</h2>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {passwordError && <span className="error">{passwordError}</span>}
            {registrationError && (
              <span className="error">
                This username and password are already registered.
              </span>
            )}
          </div>
          <button type="submit">Register</button>
        </form>
      </div>

      {showSuccess && (
        <div className="overlay">
          <div className="popup">
            <p>Successfully registered!</p>
            <button onClick={closePopup}>OK</button>
          </div>
        </div>
      )}
      <div className="login-link">
        <p>
          Already have an account?{" "}
          <a
            href="/login"
            onClick={(e) => {
              e.preventDefault();
              navigation("/login");
            }}
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Registration;
