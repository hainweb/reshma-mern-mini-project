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

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setName(res.data.name);
        setPrice(res.data.price);
        setCategory(res.data.category);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("name", name);
      fd.append("price", price);
      fd.append("category", category);
      if (image) fd.append("image", image);

      await API.put(`/products/update/${id}`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": localStorage.getItem("token"),
        },
      });

      navigate("/admin");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

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
        />

        <input
          className="input"
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          className="input"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="mb-3" />

        <button className="btn-yellow w-full">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
