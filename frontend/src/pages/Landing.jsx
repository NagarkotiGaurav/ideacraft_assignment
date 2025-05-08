import React ,{ useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Landing = () => {
  
  const apiUrl = import.meta.env.VITE_API_URL;

     const [products, setProducts] = useState([]);

useEffect(() => {
  fetch(`${apiUrl}/api/products`)
    .then(res => res.json())
    .then(data => setProducts(data));
}, []);

return  (<div className="p-8">
    <h1 className="text-3xl font-bold mb-4">All Products</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map(product => (
        <Link
          key={product._id}
          to={`/product/${product._id}`}
          className="border p-4 rounded-xl hover:shadow-lg transition"
        >
          <img src={apiUrl+product.image} alt={product.name} className="h-40 w-full object-cover" />
          <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
          <p className="text-gray-600">{product.description.substring(0, 60)}...</p>
        </Link>
      ))}
    </div>
  </div>)
  
}

export default Landing