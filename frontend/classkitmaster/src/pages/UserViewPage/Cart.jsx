import React, { useState, useEffect } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart") || "[]"));
  const navigate = useNavigate();

  useEffect(()=>{ localStorage.setItem("cart", JSON.stringify(cart)); }, [cart]);

  const remove = (i) => {
    const copy = [...cart]; copy.splice(i,1); setCart(copy);
  };

  const checkout = async () => {
    try {
      // try server-side checkout (protected)
      await API.post("/orders/checkout", { items: cart });
      alert("Order placed");
      setCart([]);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Checkout error - login required");
      if (err.response?.status === 401) navigate("/login");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Cart</h2>
      {cart.length === 0 ? <p>Cart empty</p> : (
        <>
          {cart.map((it, idx)=>(
            <div key={idx} className="flex gap-4 items-center border p-3 mb-2 rounded">
              <img src={it.image ? `http://localhost:5000${it.image}` : "https://via.placeholder.com/80"} className="h-20 w-20 object-cover rounded"/>
              <div><h4>{it.name}</h4><p>₹{it.price} x {it.qty}</p></div>
              <button onClick={()=>remove(idx)} className="ml-auto bg-red-500 text-white px-2 py-1 rounded">Remove</button>
            </div>
          ))}
          <div className="mt-4">
            <button onClick={checkout} className="bg-green-600 text-white px-4 py-2 rounded">Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
