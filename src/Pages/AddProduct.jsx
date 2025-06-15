import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { useProductContext } from "../Context/ProductContext";

export default function AddProduct() {

  const {categories} = useProductContext();

  // init product data
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    categoryId: "",
    count: 1,
    isInCart: false
  });

  // Navigate hook for redirection
  const navigate = useNavigate()

  // Handle input changes and store Data 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

const formHandler = async (e) => {

    e.preventDefault();

    // Validate form data
    if (!formData.name || !formData.price || !formData.categoryId) {
      toast.error('Please fill in all fields !', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      return;
    }

    // Send form data to the server
    try {
      const {data} = await axios.post(`http://localhost:3000/products`, formData)
      toast.success('Product Added Successfully !');
      setTimeout(() => {
        navigate("/admin")
      }, 2000);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
};


  return (
    <div className="wrapper bg-gray-100 min-h-screen flex justify-center items-center">
     
        <form onSubmit={formHandler} className="bg-white p-5 rounded-lg shadow-lg w-1/2 min-h-[300px]">
         <h3 className="my-4 text-4xl"> Add Product  </h3>
        <fieldset className="fieldset mt-5">
          <legend className="fieldset-legend">Product Name</legend>
          <input
            type="text"
            className="input w-full"
            placeholder="My awesome page"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </fieldset>

        <fieldset className="fieldset mt-5">
          <legend className="fieldset-legend">Product Price</legend>
          <input
            type="number"
            className="input w-full"
            placeholder="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </fieldset>

        <select
          className="select w-full mt-5"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
        >
          <option value="">Select a Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <button type="submit" className="btn btn-primary w-full mt-5">Add Product</button>
        <ToastContainer />
      </form>
    </div>
  );
}
