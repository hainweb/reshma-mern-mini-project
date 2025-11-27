// import React, { useEffect, useState } from "react";
// import API from "../../services/api";
// import { useParams, useNavigate } from "react-router-dom";

// const EditProduct = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState(null);

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const res = await API.get(`/products/${id}`);
//         setName(res.data.name);
//         setPrice(res.data.price);
//         setCategory(res.data.category);
//         setDescription(res.data.description);
//       } catch (err) {
//         console.error(err);
//         alert("Failed to load product.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, [id]);

//   const submit = async (e) => {
//     e.preventDefault();

//     const token =
//       localStorage.getItem("adminToken") || localStorage.getItem("token");

//     if (!token) {
//       alert("Unauthorized. Login again.");
//       navigate("/login");
//       return;
//     }

//     try {
//       const fd = new FormData();
//       fd.append("name", name);
//       fd.append("price", price);
//       fd.append("category", category);
//       fd.append("description", description);
//       if (image) fd.append("image", image);

//       await API.put(`/products/${id}`, fd, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       alert("Product updated successfully!");
//       navigate("/admin/products");
//     } catch (err) {
//       console.error(err);
//       alert("Update failed. Please try again.");
//     }
//   };

//   if (loading) return <p className="text-center py-8">Loading...</p>;

//   return (
//     <div className="flex justify-center px-4 py-8">
//       <form
//         onSubmit={submit}
//         className="w-full max-w-lg bg-white shadow-lg p-6 rounded-2xl border border-purple-300"
//       >
//         <h2 className="text-2xl font-bold mb-4 text-purple-700">
//           Edit Product
//         </h2>

//         <input
//           className="input"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />

//         <input
//           className="input"
//           placeholder="Price"
//           type="number"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           required
//         />

//         <input
//           className="input"
//           placeholder="Category"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           required
//         />

//         <input
//           className="input"
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />

//         <input
//           type="file"
//           className="mb-3"
//           onChange={(e) => setImage(e.target.files[0])}
//         />

//         <button className="btn-yellow w-full">Update Product</button>
//       </form>
//     </div>
//   );
// };

// export default EditProduct;


import React, { useState, useEffect } from "react";
import API from "../../services/api";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => {
        setName(res.data.name || "");
        setPrice(res.data.price || "");
        setCategory(res.data.category || "");
      })
      .catch((err) => console.log(err));
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    if (image) formData.append("image", image);

    try {
      await API.put(`/products/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/");
    } catch (err) {
      console.log("Update error:", err);
    }
  };

  return (
    <form onSubmit={submit}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={price} onChange={(e) => setPrice(e.target.value)} />
      <input value={category} onChange={(e) => setCategory(e.target.value)} />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />

      <button type="submit">Update</button>
    </form>
  );
}

export default EditProduct;
