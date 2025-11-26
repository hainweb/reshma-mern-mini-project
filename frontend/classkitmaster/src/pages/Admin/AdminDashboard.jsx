import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    API.get("/products").then((res) => setProducts(res.data));
  };

  useEffect(() => { fetchProducts(); }, []);

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure?")) {
      API.delete(`/products/${id}`, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      }).then(fetchProducts);
    }
  };

  return (
    <div className="p-6 md:p-10">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-3xl font-bold text-purple-700">Admin Dashboard</h2>
        <Link to="/admin/add-product" className="btn-purple">+ Add Product</Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border border-purple-300 rounded-xl overflow-hidden text-sm">
          <thead>
            <tr className="bg-purple-100 text-purple-800">
              <th className="border p-3">Name</th>
              <th className="border p-3">Price</th>
              <th className="border p-3">Category</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="odd:bg-white even:bg-purple-50">
                <td className="border p-3">{p.name}</td>
                <td className="border p-3">₹{p.price}</td>
                <td className="border p-3">{p.category}</td>
                <td className="border p-3 flex gap-2">
                  <Link to={`/admin/edit/${p._id}`} className="btn-yellow px-3 py-1">Edit</Link>
                  <button onClick={() => deleteProduct(p._id)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
