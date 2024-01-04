import React from "react";
import "./ProductModal.css";

function ProductModal({ product, closeModal }) {
  return (
    <div className="modal-background">
      <div className="modal">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h2>{product.title}</h2>
        <img src={product.thumbnail} alt={product.title} />
        <p>Price: {product.price}</p>
        <p>Description: {product.description}</p>
        <p>Rating: {product.rating}</p>
      </div>
    </div>
  );
}

export default ProductModal;
