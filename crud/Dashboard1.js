import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Dashboard1() {
  const navigate = useNavigate();
  const { id } = useParams();

  const Productlist = JSON.parse(localStorage.getItem("productlist")) || [];

  const handleEditClick = (id) => {
    navigate(`/ProductsUpdate/${id}`);
  };

  const handleAddClick = () => {
    navigate("/Addproducts");
  };

  return (
    <div>
      <div className="Dashboard">
        <div className="Welcome">
        </div>
        <table>
          <thead>
            <tr>
              <th>Product Id</th>
              <th>Product Name</th>
              <th>Product Details</th>
              <th>Amount</th>
              <th>Edit & delete</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Productlist.length > 0 ? (
              Productlist.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.Product_name}</td>
                  <td>{product.product_details}</td>
                  <td>{product.amount}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => handleEditClick(product.id)}>Edit & Delete</button>
                  </td>
                  <td>
                    {/* ----------------------------------------delete function not set------------------------- */}
                    <button className="btn btn-primary">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No products available.</td>
              </tr>
            )}
          </tbody>
        </table>
        <button className="btn btn-primary ml-2" onClick={handleAddClick}>Add Product</button>
      </div>
    </div>
  );
}
