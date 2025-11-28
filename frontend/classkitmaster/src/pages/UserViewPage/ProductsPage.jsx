import React, { useEffect, useState } from "react";
import API from "../../services/api";
import ProductCard from "../../components/ProductCard";
import Pagination from "../../components/Pagination";
import { useCart } from "../../components/context/CartContext";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const PER_PAGE = 6;
  const { cart, setCart } = useCart();

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data.items || res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const existing = cart.find((p) => p._id === product._id);
    if (existing) {
      setCart(
        cart.map((p) =>
          p._id === product._id ? { ...p, qty: p.qty + 1 } : p
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const filteredProducts = products
    .filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) => (category ? p.category === category : true))
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return 0;
    });

  const totalPages = Math.ceil(filteredProducts.length / PER_PAGE);
  const displayed = filteredProducts.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div>
      <div className="flex gap-3 mb-4">
        <input className="border p-2 rounded flex-1" placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)} />
        <select className="border p-2 rounded" value={category} onChange={e=>setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {[...new Set(products.map(p=>p.category))].map(c=> <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="border p-2 rounded" value={sort} onChange={e=>setSort(e.target.value)}>
          <option value="">Price</option>
          <option value="low">Low→High</option>
          <option value="high">High→Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {displayed.map(p => (
          <div key={p._id} className="border p-3 rounded">
            <img src={p.image ? `http://localhost:5000${p.image}` : "https://via.placeholder.com/300"} className="h-40 w-full object-cover mb-2 rounded" alt={p.name}/>
            <h3 className="font-bold">{p.name}</h3>
            <p>₹{p.price}</p>
            <div className="mt-2">
              <Link to={`/products/${p._id}`} className="px-3 py-1 bg-blue-600 text-white rounded">View</Link>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 justify-center mt-6">
        <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
      </div>
    </div>
  );
};

export default ProductsPage;
