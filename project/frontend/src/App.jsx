import React from 'react';
import { Routes, Route } from 'react-router-dom';


import EmailVerify from './LoginRegisterPage/EmailVerify';
import ResetPassword from './LoginRegisterPage/ResetPassword';
import { ToastContainer } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';


import DashBoard from './pages/AdminPage/DashBoard';
import Users from './pages/AdminPage/Users';
import Orders from './pages/AdminPage/Orders';
import FavoritesPage from './pages/UserPage/Favorites';
import BasketPage from './pages/UserPage/Basket';
import ProductDetail from './pages/UserPage/ProductDetail';
import Product from './components/Product';
import About from './pages/UserPage/About';
import Contact from './pages/UserPage/Contact';
import Admin from './pages/AdminPage/Admin';
import AdminProduct from './pages/AdminPage/AdminProduct';
import Login from './loginRegisterPage/Login';
import NoPage from './pages/NoPage';
import Home from './LoginRegisterPage/Home';

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
        <Route path="/kasadmin123/orders" element={<Orders />} />
      </Routes>
    </div>

  );
};

export default App;
