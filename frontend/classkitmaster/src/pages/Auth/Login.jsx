import React, { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // --- FIX: Define handleLogin function ---
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/admin/login", { email, password });

      if (res.data.success) {
        localStorage.setItem("adminToken", res.data.token);
        toast.success("Login successful");
        navigate("/admin");
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (err) {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        className="bg-white shadow-lg p-6 w-96 rounded"
        onSubmit={handleLogin}   // <-- FIXED
      >
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded w-full mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 w-full rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
