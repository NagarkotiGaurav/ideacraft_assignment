import { useState, useEffect } from 'react';

export default function AddProduct() {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null); // changed from string to file
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [variations, setVariations] = useState([
    { size: '', color: '', price: '', discount: '' },
  ]);

  useEffect(() => {
    fetch('http://localhost:4000/api/category')
      .then(res => res.json())
      .then(setCategories);
  }, []);

  useEffect(() => {
    if (category) {
      fetch(`http://localhost:4000/api/subcategory?category=${category}`)
        .then(res => res.json())
        .then(setSubCategories);
    }
  }, [category]);
  
  const handleVariationChange = (index, field, value) => {
    const updated = [...variations];
    updated[index][field] = value;
    setVariations(updated);
  };

  const addVariation = () => {
    setVariations([...variations, { size: '', color: '', price: '', discount: '' }]);
  };

  const removeVariation = (index) => {
    const updated = variations.filter((_, i) => i !== index);
    setVariations(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('productCode', code);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('subCategory', subCategory);
    formData.append('variations', JSON.stringify(variations));
    if (image) formData.append('image', image);

    try {
      const res = await fetch('http://localhost:4000/api/products', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) throw new Error('Failed to add product');
      alert('Product added!');

      // Reset form
      setName('');
      setImage(null);
      setCode('');
      setDescription('');
      setCategory('');
      setSubCategory('');
      setVariations([{ size: '', color: '', price: '', discount: '' }]);
    } catch (err) {
      console.error(err);
      alert('Something went wrong!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">Add Product</h2>

      <input className="border p-2 w-full" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />
      
      <input
        type='file'
        accept="image/*"
        className="border p-2 w-full"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <input className="border p-2 w-full" placeholder="Product Code" value={code} onChange={(e) => setCode(e.target.value)} />
      
      <textarea className="border p-2 w-full" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

      <select className="border p-2 w-full" value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>{cat.name}</option>
        ))}
      </select>

      <select className="border p-2 w-full" value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
        <option value="">Select SubCategory</option>
        {subCategories.map((sub) => (
          <option key={sub._id} value={sub._id}>{sub.name}</option>
        ))}
      </select>

      <h3 className="text-xl font-semibold mt-4">Variations</h3>
      {variations.map((v, idx) => (
        <div key={idx} className="grid grid-cols-2 md:grid-cols-4 gap-2 items-center mb-2">
          <input className="border p-2" placeholder="Size" value={v.size} onChange={(e) => handleVariationChange(idx, 'size', e.target.value)} />
          <input className="border p-2" placeholder="Color" value={v.color} onChange={(e) => handleVariationChange(idx, 'color', e.target.value)} />
          <input type="number" className="border p-2" placeholder="Price" value={v.price} onChange={(e) => handleVariationChange(idx, 'price', e.target.value)} />
          <input type="number" className="border p-2" placeholder="Discount" value={v.discount} onChange={(e) => handleVariationChange(idx, 'discount', e.target.value)} />
          {variations.length > 1 && (
            <button type="button" className="text-red-500" onClick={() => removeVariation(idx)}>Remove</button>
          )}
        </div>
      ))}

      <button type="button" onClick={addVariation} className="text-blue-600 underline">+ Add Another Variation</button>

      <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded block mt-4">
        Submit Product
      </button>
    </form>
  );
}
