import { useState } from "react";
import axios from "axios";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router";
import { useAuth } from "../Context/AuthContext";

export default function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

    const navigate = useNavigate()
    const { login } = useAuth();


  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
        await axios.post("http://localhost:3000/users", user);
        login(user);
        toast.success('Register Successfull ');
                setTimeout(() => {
                    navigate("/"); 
                }, 1000);
        } catch (err) {
        console.error(err);
        toast.error('Error Login Please try again ')
      }};
  

  return (
    <div className="min-h-screen flex justify-center pt-28 bg-gray-100">
      <form
        onSubmit={handleRegister}
        className=" p-8 rounded-xl shadow-lg bg-white h-fit py-16 max-w-96"
      >
        <h2 className="text-4xl font-bold text-center mb-6">Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="input input-bordered w-full mb-4"
          onChange={handleChange}
          value={user.name}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input input-bordered w-full mb-4"
          onChange={handleChange}
          value={user.email}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input input-bordered w-full mb-6"
          onChange={handleChange}
          value={user.password}
          required
        />

        <button className="btn btn-primary w-full">Register</button>
      </form>

    <ToastContainer />

    </div>
    
  );
}
