import { useState } from "react";
import axios from "axios";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import {  useNavigate } from "react-router";
import { useAuth } from "../Context/AuthContext";

export default function Login() {
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });


    const navigate = useNavigate()
    const { login } = useAuth();

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

        const { data: users } = await axios.get("https://json-server-backend-production-7fc9.up.railway.app/users");
        const matchedUser = users.find((user) =>
        user.email === loginData.email && user.password === loginData.password
        );

        if (matchedUser) {
            login(matchedUser);
             toast.success('Login Successfully !');
                   setTimeout(() => {
                    navigate("/"); 
                }, 1000);
        } else {
            toast.error('Invalid email or password ');
        }
        } catch (error) {
        console.error(error);
          toast.error('something Wrong Happend');
        }
      };

  return (
    <div className="min-h-screen flex justify-center pt-28 bg-gray-100 px-5">
      <form
        onSubmit={handleLogin}
        className=" p-4 md:p-8 rounded-xl shadow-lg bg-white h-fit py-16 max-w-96 min-h-96"
      >
        <h2 className="text-4xl font-bold text-center mb-6">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input input-bordered w-full mb-4"
          onChange={handleChange}
          value={loginData.email}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input input-bordered w-full mb-6"
          onChange={handleChange}
          value={loginData.password}
          required
        />
        <p className="text-gray-400 text-sm my-5"> For admin Test use :  <span className="font-bold "> mohamed@test.com  & 123456 </span>   </p>
        <button className="btn btn-primary w-full">Login</button>
      </form>

      <ToastContainer />
      
    </div>
  );
}
