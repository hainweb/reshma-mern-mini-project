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
      await API.put(`/products/update/${id}`, fd, { headers: { "Content-Type": "multipart/form-data","x-auth-token": localStorage.getItem("token") } });
      navigate("/admin");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <form onSubmit={submit} className="max-w-md bg-white p-6 rounded shadow">
      <h2 className="text-xl mb-4">Edit Product</h2>
      <input className="border p-2 rounded w-full mb-3" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
      <input className="border p-2 rounded w-full mb-3" placeholder="Price" type="number" value={price} onChange={e=>setPrice(e.target.value)} />
      <input className="border p-2 rounded w-full mb-3" placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)} />
      <input type="file" onChange={e=>setImage(e.target.files[0])} className="mb-3" />
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Update</button>
    </form>
  );
};

export default EditProduct;
