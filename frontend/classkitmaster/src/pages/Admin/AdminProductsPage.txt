import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete?")) return;
    try {
      await API.delete(`/products/delete/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map(p => (
          <div key={p._id} className="border p-3 rounded">
            <img src={p.image ? `http://localhost:5000${p.image}` : "https://via.placeholder.com/300"} className="h-40 w-full object-cover rounded mb-2" alt={p.name}/>
            <h3 className="font-bold">{p.name}</h3>
            <p>₹{p.price}</p>
            <div className="mt-2 flex gap-2">
              <button onClick={()=>navigate(`edit-product/${p._id}`)} className="px-2 py-1 bg-yellow-400 rounded">Edit</button>
              <button onClick={()=>handleDelete(p._id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProductsPage;
