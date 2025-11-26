import React, { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("name", name);
      fd.append("price", price);
      fd.append("category", category);
      fd.append("image", image);

      await API.post("/products/add", fd, { 
        headers: { "x-auth-token": localStorage.getItem("token") }
      });

      navigate("/admin");
    } catch (err) {
      console.error(err);
      alert("Add failed");
    }
  };

  return (
    <div className="flex justify-center px-4 py-8">
      <form onSubmit={submit} className="w-full max-w-lg card">
        <h2 className="text-2xl font-bold mb-4 text-purple-700">Add New Product</h2>

        <input className="input" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />

        <input className="input" placeholder="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />

        <input className="input" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />

        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="mb-3" />

        <button className="btn-yellow w-full">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
