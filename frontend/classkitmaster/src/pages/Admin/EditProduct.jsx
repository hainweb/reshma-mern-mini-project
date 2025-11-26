import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setName(res.data.name);
        setPrice(res.data.price);
        setCategory(res.data.category);
      } catch (err) {
        console.error(err);
        alert("Failed to load product data.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

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
      if (image) fd.append("image", image);

      for (let pair of fd.entries()) console.log(pair[0], pair[1]);

      await API.put(`/products/${id}`, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product updated successfully!");
      navigate("/admin");
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        alert("Unauthorized. Please log in again.");
        navigate("/login");
      } else {
        alert("Update failed. Please check input and try again.");
      }
    }
  };

  if (loading) return <p className="text-center py-8">Loading product data...</p>;

  return (
    <div className="flex justify-center px-4 py-8">
      <form
        onSubmit={submit}
        className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6 border border-purple-300"
      >
        <h2 className="text-2xl font-bold mb-4 text-purple-700">Edit Product</h2>

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

        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="mb-3" />

        <button className="btn-yellow w-full">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
