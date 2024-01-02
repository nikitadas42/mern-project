// App.js
import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Home from "./components/Home";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <h1>My App</h1>
        </header>
        <nav>
          <ul>
            <li>
              <a href="/"></a>
            </li>
            <li>
              <a href="/login"></a>
            </li>
            <li>
              <a href="/home"></a>
            </li>
          </ul>
        </nav>
        <div className="container">
          <Routes>
            <Route path="/" element={<Registration />} />
            <Route
              path="/login"
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="/home"
              element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
