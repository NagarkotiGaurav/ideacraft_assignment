// src/pages/admin/AddSubCategory.jsx
import { useState, useEffect } from 'react';

export default function AddSubCategory() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/category')
      .then(res => res.json())
      .then(setCategories);
  }, []);
console.log(categories)
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:4000/api/subcategory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, category }),
    });
    alert('SubCategory added!');
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Add SubCategory</h2>
      <input className="border p-2 w-full" placeholder="SubCategory Name" value={name} onChange={(e) => setName(e.target.value)} />
      <select className="border p-2 w-full" value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>{cat.name}</option>
        ))}
      </select>
      <button className="bg-green-600 text-white py-2 px-4 rounded" type="submit">Add</button>
    </form>
  );
}
