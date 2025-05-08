// src/pages/admin/AdminDashboard.jsx
import { Link, Outlet } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl text-center font-bold">Admin Dashboard</h1>
      <div className='flex'>
      <div className="flex flex-col gap-4">
        <Link className="bg-blue-600 text-white py-2 px-4 rounded" to="/admin/category">Add Category</Link>
        <Link className="bg-blue-600 text-white py-2 px-4 rounded" to="/admin/subcategory">Add SubCategory</Link>
        <Link className="bg-blue-600 text-white py-2 px-4 rounded" to="/admin/product">Add Product</Link>
        <Link className="bg-blue-600 text-white py-2 px-4 rounded" to='/admin' >Add users</Link>
      </div>
      <Outlet/>
      </div>
      
    </div>
  );
}
