import React, { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", { name, email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-md">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={submit} className="bg-white p-4 rounded shadow">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="border p-2 rounded w-full mb-3" />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="border p-2 rounded w-full mb-3" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="border p-2 rounded w-full mb-3" />
        <button className="bg-green-600 text-white px-4 py-2 rounded w-full">Register</button>
      </form>
    </div>
  );
};

export default Register;
