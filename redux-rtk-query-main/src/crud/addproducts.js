import React, { useEffect, useState } from "react";
import { useForm,Controller  } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";

const AddProducts = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const [selectedImage, setSelectedImage] = useState(null);
  const[imageselect,setImageSelect]=useState('')
let current_user= JSON.parse(localStorage.getItem("CurrentUser")) || [] ;
  const validationSchema = Yup.object().shape({
    Product_name: Yup.string().required("Product name is required").trim(),
    product_details: Yup.string().required("Product details is required").trim(),
    amount: Yup.string().required("Amount is required").trim(),
    productImage: Yup
    .mixed()
    .test('required', 'Image is required', (value) => {
      return !!value; // Check if any files are selected
    }),

  });
console.log(current_user);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onBlur"
  });

  const nav = useNavigate();
  const { userId } = useParams(); 
console.log(userId);
  useEffect(() => {
    if (isEditMode) {
    
      const productlist = JSON.parse(localStorage.getItem("productlist")) || [];
      const product = productlist.find((product) => product.id === parseInt(id));
      if (product) {
        setValue("Product_name", product.Product_name);
        setValue("product_details", product.product_details);
        setValue("amount", product.amount);
        setValue("productImage", selectedImage);

      }
    }
  }, [id, isEditMode, setValue]);
console.log(selectedImage);
  const onSubmit = (data) => {
    let productlist = JSON.parse(localStorage.getItem("productlist")) || [];

    if (isEditMode) {
      productlist = productlist.map((product) => {
        if (product.id === parseInt(id)) {
          return {
            ...product,
            Product_name: data.Product_name,
            product_details: data.product_details,
            amount: data.amount,
            productImage:selectedImage
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
        productImage:selectedImage,
        userEmail: current_user[0].email
      };
      productlist.push(newProduct);

      // if (!Array.isArray(current_user)) {
      //   current_user = [];
      // }

      // Push the newProduct into the existing data
      // current_user['0'].product = newProduct;

      // Check if the object with key "0" exists and has a "product" array
if (current_user.hasOwnProperty('0') && Array.isArray(current_user['0'].product)) {
  // Push the new product into the existing "product" array
  current_user['0'].product.push(newProduct);
} else {
  // If the object with key "0" doesn't exist or doesn't have a "product" array, create it
  current_user['0'] = {
    ...current_user['0'],
    product: [newProduct],
  };
}


    }
    // Store the updated data back in localStorage
localStorage.setItem('CurrentUser', JSON.stringify(current_user));

    localStorage.setItem("productlist", JSON.stringify(productlist));

    alert(isEditMode ? "Product updated successfully!" : "Product registered successfully!");
    reset();
    // nav("/Dashboard");
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
console.log(file);
setImageSelect(file)
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };

      reader.readAsDataURL(file);
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
          <label>Product image</label>
          <Controller
            name="productImage"
            control={control}
            render={({ field }) => (
              <input
                type="file"
                className={`form-control ${errors.productImage ? 'is-invalid' : ''}`}
                onChange={(e) => {field.onChange(e.target.files);handleImageChange(e);}
                
                }
              />
            )}
          />
          {errors.productImage && (
            <div className="invalid-feedback">{errors.productImage?.message}</div>
          )}
        </div>
        {selectedImage && (
        <div className="image-preview">
          <img src={selectedImage} alt="Selected" className="img-fluid" width="300px" height="300px"/>
        </div>
      )}
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            {isEditMode ? "Update" : "Register"}
          </button>
          <br />
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
