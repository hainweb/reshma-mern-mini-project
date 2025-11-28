import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/api";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await API.get(`/products/${id}`);
      const p = res.data.product || res.data;
      setName(p.name);
      setPrice(p.price);
      setCategory(p.category);
      setDescription(p.description);
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      await API.put(`/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Product updated");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };
n (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" type="number" />
      <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit">Update Product</button>
    </form>
  );
};

export default EditProduct;
