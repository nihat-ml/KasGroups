import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'material-react-toastify';
import { FaHeart, FaShoppingBasket } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContent);
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/send-verify-otp");
      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      if (data.success) {
        setIsLoggedin(false);
        setUserData(false);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={`w-full fixed top-0 left-0 z-50 flex justify-between items-center p-4 sm:p-6 sm:px-24 transition-all duration-300 ${
      isScrolled ? 'bg-white dark:bg-gray-900 shadow-md' : 'bg-transparent'
    }`}>
      
      
      <button onClick={() => navigate("/")} className="focus:outline-none">
        <img src={assets.kaslogo1} alt="Logo" className='w-10 sm:w-14' />
      </button>
      
      {userData ? (
        <div className='flex items-center space-x-4'>
          
          <button onClick={() => navigate("/favorites")} className="hover:opacity-80">
            <FaHeart className='w-6 h-6 text-red-500' />
          </button>
          <button onClick={() => navigate("/basket")} className="hover:opacity-80">
            <FaShoppingBasket className='w-6 h-6 text-blue-500' />
          </button>

         
          <button
            onClick={toggleDarkMode}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-500 dark:border-gray-300 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white transition-all"
          >
            {darkMode ? "🌙" : "☀️"}
          </button>
          
          <div className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group cursor-pointer'>
            {userData.name[0].toUpperCase()}
            <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
              <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
                {!userData.isAccountVerified && (
                  <li onClick={sendVerificationOtp} className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>
                    Verify Email
                  </li>
                )}
                <li onClick={logout} className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10'>
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate('/login')}
          className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 dark:text-white dark:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all'
        >
          Login <img src={assets.arrow_icon} alt="Arrow Icon" />
        </button>
      )}
    </div>
  );
};

export default Navbar;