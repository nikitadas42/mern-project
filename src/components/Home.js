// Home.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Import your CSS file

function Home() {
  const [productDetails, setProductDetails] = useState([]);
  const navigation = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    navigation("/login");
  };

  useEffect(() => {
    fetch("https://dummyjson.com/products") // Replace with your API endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Received data:", data); // Log the received data

        // Check if data is an object and has a 'products' property
        if (typeof data === "object" && data.hasOwnProperty("products")) {
          setProductDetails(data.products); // Set products from the 'products' property
        } else {
          console.error("Invalid data format received:", data);
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="App">
      <h2>Welcome to the Home Page</h2>
      <div className="products">
        <h3>Products:</h3>
        <div className="product-grid">
          {productDetails.map((product, index) => (
            <div key={index} className="product-item">
              <h4>{product.title}</h4>
              <img src={product.thumbnail} alt={product.title} />
              <p>Price: {product.price}</p>
              <p>Description: {product.description}</p>
            </div>
          ))}
        </div>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
