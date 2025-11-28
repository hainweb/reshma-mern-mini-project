import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("image", image);

      await API.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product added");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Add product failed");
    }
  };

  return (
    <div className="flex justify-center px-4 py-8">
      <form
        onSubmit={submit}
        className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6 border border-purple-300"
      >
        <h2 className="text-2xl font-bold mb-4 text-purple-700">Add Product</h2>

        <input
          className="input"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="input"
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          className="input"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
<input
  className="input"
  placeholder="Description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  required
/>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="mb-3" />

        <button className="btn-yellow w-full">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
