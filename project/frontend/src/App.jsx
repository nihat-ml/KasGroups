import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from "../src/loginRegisterPage/Home"
import Login from "../src/loginRegisterPage/Login"
import EmailVerify from "../src/loginRegisterPage/EmailVerify"
import ResetPassword from "../src/loginRegisterPage/ResetPassword"


import { ToastContainer } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import FavoritesPage from '../src/pages/UserPage/Favorites';
import BasketPage from "../src/pages/UserPage/Basket"
import About from "../src/pages/UserPage/About"
import Contact from "../src/pages/UserPage/Contact"
import Product from './components/Product';
import ProductDetail from "../src/pages/UserPage/ProductDetail"
import NoPage from "../src/pages/NoPage"
import Admin from '../src/pages/AdminPage/Admin'
import AdminProduct from "../src/pages/AdminPage/AdminProduct"
import DashBoard from '../src/pages/AdminPage/Dashboard'
import Users from "../src/pages/AdminPage/Users"





const App = () => {
  return (

    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-all">

      <ToastContainer />





      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/basket" element={<BasketPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Product />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        <Route path='*' element={<NoPage />} />
        <Route path="/kasadmin123" element={<Admin />} />
        <Route path="/kasadmin123/products" element={<AdminProduct />} />
        <Route path="/kasadmin123/dashboard" element={<DashBoard />} />
        <Route path="/kasadmin123/users" element={<Users />} />
       
      </Routes>
    </div>

  );
};

export default App;
