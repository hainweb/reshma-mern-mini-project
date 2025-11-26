import React, { useState } from "react";
import API from "../../services/api"; // axios instance
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
const [description, setDescription] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("adminToken") || localStorage.getItem("token");
    if (!token) {
      alert("You are not authorized. Please log in as admin.");
      navigate("/login");
      return;
    }

    try {
      const fd = new FormData();
      fd.append("name", name.trim());
      fd.append("price", Number(price));
      fd.append("category", category.trim());
      fd.append("description", description.trim());

      if (image) fd.append("image", image);

      // Debug FormData
      for (let pair of fd.entries()) console.log(pair[0], pair[1]);

     await API.post("/products", fd, {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
  },
});


      alert("Product added successfully!");
      navigate("/admin");
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        alert("Unauthorized. Please log in again.");
        navigate("/login");
      } else if (err.response?.status === 404) {
        alert("API endpoint not found. Check your backend route.");
      } else {
        alert("Failed to add product. Please check input and try again.");
      }
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
