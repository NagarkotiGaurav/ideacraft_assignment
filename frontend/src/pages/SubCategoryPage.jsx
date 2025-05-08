import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function SubCategoryPage() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const { categoryName,subCategoryName } = useParams();
  const [products, setProducts] = useState([]);
  console.log(subCategoryName)
  useEffect(() => {
    fetch(`${apiUrl}/api/products?category=${categoryName}&subCategory=${subCategoryName}`)
      .then(res => res.json())
      .then(data => setProducts(data));
      console.log(products)
  }, [subCategoryName,categoryName]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Subcategory: {subCategoryName}</h1>
      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          { products.length > 0 ? (
             products.map(product => (
               <Link
                 key={product._id}
                 to={`/product/${product._id}`}
                 className="border p-4 rounded-xl hover:shadow-lg transition"
               >
                 <img src={apiUrl+product.image} alt={product.name} className="h-40 w-full object-cover" />
                 <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
               </Link>
             ))
           ) : (
             <h2>No items</h2>
           )}
        </div>
      
    </div>
  );
}
