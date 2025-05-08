// src/pages/admin/AddCategory.jsx
import { useState } from 'react';

export default function AddCategory() {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:4000/api/category', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    alert('Category added!');
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Add Category</h2>
      <input
        className="border p-2 w-full"
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="bg-green-600 text-white py-2 px-4 rounded" type="submit">
        Add
      </button>
    </form>
  );
}
