import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/products");
      setProducts(res.data.items || res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  return (
    <div className="p-6 md:p-10">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-3xl font-bold text-purple-700">Admin Dashboard</h2>
        <Link to="/admin/add-product" className="btn-purple">+ Add Product</Link>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border border-purple-300 rounded-xl overflow-hidden text-sm">
            <thead>
              <tr className="bg-purple-100 text-purple-800">
                <th className="border p-3">Name</th>
                <th className="border p-3">Price</th>
                <th className="border p-3">Category</th>
                <th className="border p-3">Image</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="odd:bg-white even:bg-purple-50">
                  <td className="border p-3">{p.name}</td>
                  <td className="border p-3">₹{p.price}</td>
                  <td className="border p-3">{p.category}</td>
                  <td className="border p-3">{p.image}</td>
                  <td className="border p-3 flex gap-2">
                    <Link to={`/admin/edit-product/${p._id}`} className="btn-yellow px-3 py-1">
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteProduct(p._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
