// import React from "react";
// import { Routes, Route, Link } from "react-router-dom";
// import AddProductForm from "./AddProduct";
// import EditProductForm from "./EditProduct";
// import AdminProductsPage from "./AdminProductsPage.jtxt";

// const AdminDashboard = () => {
//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

//       <Link to="add-product" className="bg-blue-600 text-white px-4 py-2 rounded">
//         Add Product
//       </Link>

//       <Routes>
//         <Route path="/" element={<AdminProductsPage />} />
//         <Route path="add-product" element={<AddProductForm />} />
//         <Route path="edit-product/:id" element={<EditProductForm />} />
//       </Routes>
//     </div>
//   );
// };

// export default AdminDashboard;


import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    API.get("/products").then(res => setProducts(res.data));
  };

  useEffect(() => { fetchProducts(); }, []);

  const deleteProduct = id => {
    if (window.confirm("Are you sure?")) {
      API.delete(`/products/${id}`, {
        headers: { "x-auth-token": localStorage.getItem("token") }
      }).then(fetchProducts);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <Link to="/admin/add-product" className="bg-green-600 text-white px-4 py-2 rounded">Add Product</Link>
      </div>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id}>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.price}</td>
              <td className="border p-2">{p.category}</td>
              <td className="border p-2 space-x-2">
                <Link to={`/admin/edit/${p._id}`} className="bg-yellow-500 px-2 py-1 rounded text-white">Edit</Link>
                <button onClick={() => deleteProduct(p._id)} className="bg-red-600 px-2 py-1 rounded text-white">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
