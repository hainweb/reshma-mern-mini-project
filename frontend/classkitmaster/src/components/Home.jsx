// import React, { useEffect, useState } from 'react';
// import API from '../services/api'; 
// import ProductCardUser from '../components/ProductCard';

// const Home = () => {
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState('');
//   const [category, setCategory] = useState('');
//   const [sort, setSort] = useState('');
//   const [page, setPage] = useState(1);
//   const [cart, setCart] = useState([]);

//   const PRODUCTS_PER_PAGE = 6;

//   const fetchProducts = async () => {
//     let res = await API.get('/products');
//     let data = res.data;

//     // Filter
//     if (search) data = data.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
//     if (category) data = data.filter(p => p.category === category);

//     // Sort
//     if (sort === 'low') data.sort((a, b) => a.price - b.price);
//     if (sort === 'high') data.sort((a, b) => b.price - a.price);

//     setProducts(data);
//   };

//   useEffect(() => { fetchProducts(); }, [search, category, sort]);


//   // Pagination
//   const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
//   const displayedProducts = products.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE);
// const addToCart = (product) => {
//   const updatedCart = [...cart, product];
//   setCart(updatedCart);
//   localStorage.setItem("cart", JSON.stringify(updatedCart));
// };


//   return (
//     <div>
//       <h1>Products</h1>

//       {/* Search */}
//       <input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />

//       {/* Category Filter */}
//       <select value={category} onChange={e => setCategory(e.target.value)}>
//         <option value="">All Categories</option>
//         <option value="Electronics">Electronics</option>
//         <option value="Clothes">Clothes</option>
//         <option value="Shoes">Shoes</option>
//       </select>

//       {/* Sort */}
//       <select value={sort} onChange={e => setSort(e.target.value)}>
//         <option value="">Sort By</option>
//         <option value="low">Price: Low → High</option>
//         <option value="high">Price: High → Low</option>
//       </select>

//       {/* Products Grid */}
//       <div className="products-grid">
//   {displayedProducts.map(p => (
//     <ProductCardUser key={p._id} product={p} addToCart={addToCart} />
//   ))}
// </div>


//       {/* Pagination */}
//       <div style={{ marginTop: '1rem' }}>
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button key={i} onClick={() => setPage(i + 1)} style={{ margin: '0.25rem' }}>
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;

import React from "react";

const Home = () => (
  <div className="text-center mt-10">
    <h1 className="text-4xl font-bold mb-4">Welcome to ClassKit Master</h1>
    <p className="text-gray-600">Your child's First Step are with us</p>
  </div>
);

export default Home;
