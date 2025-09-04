import axios from "axios";
import React, { useState } from "react";

const SignUp = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  console.log(name);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, password }
      );
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
        <h2>Signup</h2>
        <div className="flex flex-col ">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            required
            className="border border-green-500"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </div>
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
            type="text"
            onChange={(e) => setpassword(e.target.value)}
            placeholder="Enter Name"
            required
            value={password}
            className="border border-green-500"
          />
        </div>
        <div>
          <button className="bg-green-400 text-white p-2 px-40">SignUp</button>
          <p className="ml-10">Already have an Account? login</p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
