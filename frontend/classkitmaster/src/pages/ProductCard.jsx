import { useParams } from "react-router-dom";
import { useCart } from "../components/context/CartContext";
import { useState, useEffect } from "react";
import API from "../services/api";

const ProductCard = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    API.get(`/products/${id}`).then((res) => setProduct(res.data.product));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <img src={`http://localhost:5000${product.image}`} className="h-60" />
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p>₹{product.price}</p>

      <button
        className="bg-yellow-500 text-white px-4 py-1 rounded mt-3"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
