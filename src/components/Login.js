import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const navigation = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const storedUsername = sessionStorage.getItem("registeredUsername");
    const storedPassword = sessionStorage.getItem("registeredPassword");

    if (username === storedUsername && password === storedPassword) {
      setShowSuccess(true);
      setLoginError(false);
      setIsLoggedIn(true);
    } else {
      setShowSuccess(false);
      setLoginError(true);
      setIsLoggedIn(false);
    }
  };

  const closePopup = () => {
    setShowSuccess(false);
    setLoginError(false);
    setUsername("");
    setPassword("");

    if (showSuccess) {
      navigation("/home");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Login Form</h2>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter your username"
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
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit">Login</button>
          {loginError && (
            <span className="error">Incorrect username or password</span>
          )}
        </form>
        {showSuccess && (
          <div className="overlay">
            <div className="popup">
              <p>Successfully logged in!</p>
              <button onClick={closePopup}>OK</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
