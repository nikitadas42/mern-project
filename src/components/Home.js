// Home.js
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Home.css";
import ProductModal from "./ProductModal";

function Home() {
  const [productDetails, setProductDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(4);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigation = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    navigation("/login");
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productDetails.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Received data:", data);

        if (typeof data === "object" && data.hasOwnProperty("products")) {
          setProductDetails(data.products);
        } else {
          console.error("Invalid data format received:", data);
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    if (currentPage > Math.ceil(productDetails.length / productsPerPage)) {
      setCurrentPage(1);
    }
  }, [currentPage, productDetails, productsPerPage]);

  return (
    <div className="App">
      <h2>Welcome to the Home Page</h2>
      <div className="navigation">
        <nav>
          <ul>
            <li>
              <Link to="/table">Table</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="products">
        <h3>Products:</h3>
        <div className="product-grid">
          {currentProducts.map((product, index) => (
            <div key={index} className="product-item">
              <h4>{product.title}</h4>
              <img
                className="home_images"
                src={product.thumbnail}
                alt={product.title}
              />
              <p>Price: {product.price}</p>
              <button onClick={() => openModal(product)}>Details</button>
            </div>
          ))}
        </div>
        <ul className="pagination">
          {currentPage !== 1 && (
            <li className="page-item">
              <button
                onClick={() => paginate(currentPage - 1)}
                className="page-link"
              >
                Previous
              </button>
            </li>
          )}
          {Array.from(
            {
              length: Math.ceil(productDetails.length / productsPerPage),
            },
            (_, i) => i + 1
          )
            .slice(currentPage - 1, currentPage + 2)
            .map((pageNumber) => (
              <li
                key={pageNumber}
                className={`page-item ${
                  pageNumber === currentPage ? "active" : ""
                }`}
              >
                <button
                  onClick={() => paginate(pageNumber)}
                  className="page-link"
                >
                  {pageNumber}
                </button>
              </li>
            ))}
          {productDetails.length > productsPerPage * currentPage && (
            <li className="page-item">
              <button
                onClick={() => paginate(currentPage + 1)}
                className="page-link"
              >
                Next
              </button>
            </li>
          )}
        </ul>
      </div>
      <div className="logout-btn">
        <button onClick={handleLogout}>Logout</button>
      </div>
      {selectedProduct && (
        <ProductModal product={selectedProduct} closeModal={closeModal} />
      )}
    </div>
  );
}

export default Home;
