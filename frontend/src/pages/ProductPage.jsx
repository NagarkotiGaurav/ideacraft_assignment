// src/pages/ProductPage.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedVariation, setSelectedVariation] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/api/products/${id}`)
      .then(res => res.json())
      .then(setProduct);
  }, [id]);

  useEffect(() => {
    if (product) {
      const match = product.variations.find(
        v => v.size === selectedSize && v.color === selectedColor
      );
      setSelectedVariation(match);
    }
  }, [selectedSize, selectedColor, product]);

  if (!product) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <img src={apiUrl+product.image} alt={product.name} className="w-full max-h-96 object-contain mb-4" />

      <p className="mb-2">{product.description}</p>
      <p className="text-sm text-gray-500 mb-4">
        Category: {product.category?.name} | SubCategory: {product.subCategory?.name}
      </p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block font-medium mb-1">Select Size</label>
          <select
            className="border p-2 w-full"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            <option value="">-- Choose Size --</option>
            {[...new Set(product.variations.map(v => v.size))].map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Select Color</label>
          <select
            className="border p-2 w-full"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            <option value="">-- Choose Color --</option>
            {[...new Set(product.variations.map(v => v.color))].map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </div>
      </div>

      {selectedVariation ? (
        <div className="mt-4 text-lg">
          <p>
            Price: ₹{selectedVariation.price}{' '}
            {selectedVariation.discount > 0 && (
              <span className="text-red-500 ml-2">
                (Discount: {selectedVariation.discount}%)
              </span>
            )}
          </p>
        </div>
      ) : (
        <p className="text-gray-600 mt-2">Select size and color to see the price</p>
      )}
    </div>
  );
}
