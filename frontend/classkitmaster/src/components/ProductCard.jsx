import React from 'react';
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product,onAddToCart  }) => {
  const navigate = useNavigate();

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart`);
  };

  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <img src={product.image} alt={product.name} className="h-40 w-full object-cover mb-2 rounded"/>
      <h2 className="font-bold text-lg">{product.name}</h2>
      <p className="text-gray-600">₹{product.price}</p>
      <p className="text-sm text-gray-500">{product.category}</p>
     <div className="mt-3 flex gap-2">
        <button onClick={() => navigate(`/products/${product._id}`)} className="flex-1 border px-3 py-1 rounded">View</button>
        <button onClick={() => onAddToCart(product)} className="bg-blue-600 text-white px-3 py-1 rounded">Add</button>
      </div>
    </div>
  );
};

export default ProductCard;
