// App.js

import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Home from "./components/Home";
import TablePage from "./components/TablePage";
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
              <Link to="/"></Link>
            </li>
            <li>
              <Link to="/login"></Link>
            </li>
            <li>
              <Link to="/home"></Link>
            </li>
            <li>
              <Link to="/table"></Link>
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
            <Route path="/table" element={<TablePage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
