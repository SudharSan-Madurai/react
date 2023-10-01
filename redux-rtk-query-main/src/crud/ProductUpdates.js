import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";

const Productupdates = () => {
  const { id } = useParams();
  const isEditMode = !!id;

  const validationSchema = Yup.object().shape({
    Product_name: Yup.string().required("Product name is required").trim(),
    product_details: Yup.string().required("Product details is required").trim(),
    amount: Yup.string().required("Amount is required").trim(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
  });

  const nav = useNavigate();

  useEffect(() => {
    if (isEditMode) {
      const productlist = JSON.parse(localStorage.getItem("productlist")) || [];
      const product = productlist.find((product) => product.id === parseInt(id));
      if (product) {
        setValue("Product_name", product.Product_name);
        setValue("product_details", product.product_details);
        setValue("amount", product.amount);
      }
    }
  }, [id, isEditMode, setValue]);

  const onSubmit = (data) => {
    let productlist = JSON.parse(localStorage.getItem("productlist")) || [];

    if (isEditMode) {
      productlist = productlist.map((product) => {
        if (product.id === parseInt(id, 10)) {
          return {
            ...product,
            Product_name: data.Product_name,
            product_details: data.product_details,
            amount: data.amount,
          };
        }
        return product;
      });
    } else {
      const newProduct = {
        id: productlist.length + 1,
        Product_name: data.Product_name,
        product_details: data.product_details,
        amount: data.amount,
      };
      productlist.push(newProduct);
    }

    localStorage.setItem("productlist", JSON.stringify(productlist));

    alert(isEditMode ? "Product updated successfully!" : "Product registered successfully!");
    reset();
    nav("/Dashboard");
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      let productlist = JSON.parse(localStorage.getItem("productlist")) || [];

      productlist = productlist.filter((product) => product.id !== parseInt(id));

      localStorage.setItem("productlist", JSON.stringify(productlist));

      alert("Product deleted successfully!");
      nav("/Dashboard");
    }
  };

  return (
    <div className="register-form">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Product name</label>
          <input
            name="Product_name"
            type="text"
            autoFocus
            {...register("Product_name")}
            className={`form-control ${errors.Product_name ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.Product_name?.message}</div>
        </div>

        <div className="form-group">
          <label>Product details</label>
          <input
            name="product_details"
            type="text"
            {...register("product_details")}
            className={`form-control ${errors.product_details ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.product_details?.message}</div>
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            name="amount"
            type="text"
            {...register("amount")}
            className={`form-control ${errors.amount ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.amount?.message}</div>
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            {isEditMode ? "Update" : "Register"}
          </button>
          {isEditMode && (
            <button type="button" className="btn btn-danger ml-2" onClick={handleDelete}>
              Delete
            </button>
          )}
          <br />
        </div>
      </form>
    </div>
  );
};

export default Productupdates;
