import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const PER_PAGE = 6;

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (err) { console.error(err); }
    };
    load();
  }, []);

let filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
if (category) filtered = filtered.filter(p => p.category === category);
if (sort === "low") filtered.sort((a,b)=>a.price-b.price);
if (sort === "high") filtered.sort((a,b)=>b.price-a.price);

const totalPages = Math.ceil(filtered.length / PER_PAGE);
const displayed = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE);

  return (
    <div>
      <div className="flex gap-3 mb-4">
        <input className="border p-2 rounded flex-1" placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)} />
        <select className="border p-2 rounded" value={category} onChange={e=>setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {[...new Set(products.map(p=>p.category))].map(c=> <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="border p-2 rounded" value={sort} onChange={e=>setSort(e.target.value)}>
          <option value="">Sort</option>
          <option value="low">Price Low→High</option>
          <option value="high">Price High→Low</option>
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
        {Array.from({length: totalPages}, (_,i)=>i+1).map(n=>(
          <button key={n} onClick={()=>setPage(n)} className={`px-3 py-1 rounded ${page===n ? "bg-blue-600 text-white":"bg-gray-200"}`}>{n}</button>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
