import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import AdminDashboard from "../Admin/AdminDashboard";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.user.role === "admin") navigate("/admin");
else navigate("/");

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Admin Login</h2>
      <input className="border p-2 rounded w-full mb-3" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="border p-2 rounded w-full mb-3" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Login</button>
    </form>
  );
};

export default Login;
