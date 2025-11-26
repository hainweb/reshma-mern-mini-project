import { createContext, useContext, useEffect, useState } from "react";
import API from "../../services/api";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // If admin exists in localStorage
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setAdmin({ email: "admin" });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await API.post("/admin/login", { email, password });
      localStorage.setItem("adminToken", res.data.token);
      setAdmin(res.data.admin);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Login failed" };
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setAdmin(null);
  };

  return (
    <AdminContext.Provider value={{ admin, login, logout, loading, isAdmin: !!admin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
