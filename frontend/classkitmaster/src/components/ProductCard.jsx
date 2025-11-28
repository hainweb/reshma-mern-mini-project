import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl p-4 transition-transform duration-300 hover:-translate-y-2 border border-gray-200">
      <div className="w-full h-48 rounded-xl overflow-hidden">
        <img
          src={product.image ? `http://localhost:5000${product.image}` : "https://via.placeholder.com/300"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      <h2 className="mt-3 text-xl font-bold text-gray-800">{product.name}</h2>
      <p className="text-purple-600 font-semibold text-lg mt-1">₹{product.price}</p>
      <p className="text-sm text-gray-500">{product.category}</p>

      <div className="mt-4 flex gap-3">
        <button
          onClick={() => navigate(`/products/${product._id}`)}
          className="flex-1 px-4 py-2 rounded-lg border border-purple-600 text-purple-600 font-medium hover:bg-purple-600 hover:text-white transition-colors duration-300"
        >
          View
        </button>
        <button
          onClick={() => onAddToCart(product)}
          className="flex-1 px-4 py-2 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition-colors duration-300 shadow-md"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
