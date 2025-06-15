import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Bounce, ToastContainer, toast } from 'react-toastify';

export default function AddPost() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: ""
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const formHandler = async (e) => {
    e.preventDefault();

   
    if (!formData.title || !formData.description || !formData.image) {
      toast.error('Please fill in all fields!');
      return;
    }
   
    const postData = {
      ...formData,
      userId: user.id,
      author: user.name
    };

    try {
      await axios.post("http://localhost:3000/posts", postData);

      toast.success("Post Added Successfully!");

      setTimeout(() => {
        navigate("/blog");
      }, 1000);

    } catch (error) {
      console.error(error);
      toast.error("Failed to add post");
    }
  };

  return (
    <div className="wrapper bg-gray-100 min-h-screen flex justify-center items-center">
      <form onSubmit={formHandler} className="bg-white p-5 rounded-lg shadow-lg w-1/2 min-h-[300px]">
        <h3 className="my-4 text-4xl font-bold">Add Post</h3>

        <fieldset className="fieldset mt-5">
          <legend className="fieldset-legend">Post Title</legend>
          <input
            type="text"
            className="input w-full"
            placeholder="Post Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </fieldset>

        <fieldset className="fieldset mt-5">
          <legend className="fieldset-legend">Post Description</legend>
          <textarea
            className="textarea w-full"
            placeholder="Post Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </fieldset>

        <fieldset className="fieldset mt-5">
          <legend className="fieldset-legend">Image URL</legend>
          <input
            type="text"
            className="input w-full"
            placeholder="https://example.com/image.jpg"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </fieldset>

        <button type="submit" className="btn btn-primary w-full mt-5">Add Post</button>
        <ToastContainer />
      </form>
    </div>
  );
}
