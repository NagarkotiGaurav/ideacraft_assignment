import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import Landing from './pages/Landing'; // create this file for landing content
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUserPanel from './pages/admin/AdminUserPanel';
import AddCategory from './pages/admin/AddCategory';
import AddSubCategory from './pages/admin/AddSubcategory';
import AddProduct from './pages/admin/AddProduct';
import LoginRegister from './components/LoginRegister';
import SubCategoryPage from './pages/SubCategoryPage';
import ProductPage from './pages/ProductPage';

function App() {
  return (<BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Landing />} />
        <Route path='/login' element={<LoginRegister/>} />
        <Route path="/category/:categoryName" element={<CategoryPage />} >
        </Route>
        <Route path="/category/:categoryName/subcategory/:subCategoryName" element={<SubCategoryPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Route>
      <Route path='/admin' element={<AdminDashboard/>}>
      <Route index  element={<AdminUserPanel/>}/>
      <Route path='/admin/category' element={<AddCategory/>} />
      <Route path='/admin/subcategory' element={<AddSubCategory/>} />
      <Route path='/admin/product' element={<AddProduct/>} />
      </Route>
    </Routes>
  </BrowserRouter>)


    ;
}

export default App;
