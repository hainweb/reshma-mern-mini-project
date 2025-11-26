import React from "react";
import { Toaster } from "react-hot-toast";

import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ProductsPage from "./components/ProductsPage";
import Cart from "./components/Cart";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddProduct from "./pages/Admin/AddProduct";
import EditProduct from "./pages/Admin/EditProduct";
import Navbar from "./components/Navbar";
import AdminRoute from "./pages/Admin/AdminRoute";
function App() {
  return (

    <div className="min-h-screen bg-gray-100">
                <Toaster position="top-center" />

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Protected Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/add-product"
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/edit-product/:id"
          element={
            <AdminRoute>
              <EditProduct />
            </AdminRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
