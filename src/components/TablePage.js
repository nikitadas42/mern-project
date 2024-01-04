// TablePage.js
import React, { useState, useEffect } from "react";
import "./TablePage.css";

function TablePage() {
  const [productDetails, setProductDetails] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedRows, setEditedRows] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (typeof data === "object" && data.hasOwnProperty("products")) {
          setProductDetails(data.products);
          setEditedRows(Array(data.products.length).fill(false));
        } else {
          console.error("Invalid data format received:", data);
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const editProduct = (index) => {
    const updatedEditedRows = [...editedRows];
    updatedEditedRows[index] = true;
    setEditedRows(updatedEditedRows);
    setEditIndex(index);
  };

  const updateProduct = (index, updatedProduct) => {
    const updatedProducts = [...productDetails];
    updatedProducts[index] = updatedProduct;
    setProductDetails(updatedProducts);
  };

  const saveProduct = (index) => {
    const editedRowValues = Object.values(productDetails[index]);
    const isRowEdited = editedRowValues.every(
      (value) => value !== null && value !== ""
    );

    if (isRowEdited) {
      // Implement the save functionality here
      console.log("Updated Product Details:", productDetails[index]);
      setEditIndex(null);
      const updatedEditedRows = [...editedRows];
      updatedEditedRows[index] = false;
      setEditedRows(updatedEditedRows);
    } else {
      console.log("Please edit all fields before saving.");
    }
  };

  return (
    <div className="TablePage">
      <h2>All Product Details</h2>
      <table>
        <thead>
          <tr>
            <th>ProductId</th>
            <th>Title</th>
            <th>Thumbnail</th>
            <th>Description</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {productDetails.map((product, index) => (
            <tr key={index} style={{ background: "#fff" }}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>
                <img src={product.thumbnail} alt={product.title} />
              </td>
              {editIndex === index ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={product.description}
                      onChange={(e) => {
                        const updatedProduct = { ...product };
                        updatedProduct.description = e.target.value;
                        updateProduct(index, updatedProduct);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={product.price}
                      onChange={(e) => {
                        const updatedProduct = { ...product };
                        updatedProduct.price = e.target.value;
                        updateProduct(index, updatedProduct);
                      }}
                    />
                  </td>
                  <td>
                    <button onClick={() => saveProduct(index)}>Save</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>
                    <button onClick={() => editProduct(index)}>Edit</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablePage;
