import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";
const Login = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
   const {login}=useAuth();
  console.log(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);

        navigate("/");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-gray-100 text-xl flex flex-col gap-5 p-50 items-center justify-center ">
      <form
        className="bg-white p-9 px-8 flex flex-col gap-3"
        onSubmit={handleSubmit}
      >
        <h2>Login</h2>

        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Enter Email"
            required
            className="border border-green-500"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="name">Password</label>
          <input
            type="password"
            onChange={(e) => setpassword(e.target.value)}
            placeholder="enter password"
            required
            value={password}
            className="border border-green-500"
          />
        </div>
        <div>
          <button className="bg-green-400 text-white p-2 px-40">Login</button>
          <p className="ml-10">
            Don't have an Account? <Link to="/register">SignUp</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
