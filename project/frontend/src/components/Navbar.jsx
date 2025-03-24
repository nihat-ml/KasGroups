import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { assets } from '../assets/assets';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'material-react-toastify';
import { FaHeart, FaShoppingBasket, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContent);
  const email = localStorage.getItem("email");
  const [isScrolled, setIsScrolled] = useState(false);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [basket, setBasket] = useState([]);
  const [basket1, setBasket1] = useState([]);

  async function GetAllBasket() {
    const basketResponse = await axios.get(`https://kasgroups-1.onrender.com/api/basket/${email}`,{withCredentials: true});
    const totalCount = basketResponse.data.basket.reduce((acc, item) => acc + item.count, 0);
    setBasket(totalCount); 
    setBasket1(basketResponse.data.basket);
  }

  useEffect(() => {
    GetAllBasket();
  }, [GetAllBasket]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    axios.get(`https://kasgroups-1.onrender.com/api/favorites/${email}`,{withCredentials: true})
    
      .then(res => setFavorites(res.data.favorites));

  }, [email]);

  useEffect(() => {
    window.gtranslateSettings = {
      default_language: "en",
      native_language_names: true,
      languages: ["en", "ru", "az"],
      wrapper_selector: ".gtranslate_wrapper",
    };

    const script = document.createElement("script");
    script.src = "https://cdn.gtranslate.net/widgets/latest/float.js";
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/send-verify-otp",{withCredentials: true});
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
      const { data } = await axios.post(backendUrl + "/api/auth/logout",{withCredentials: true});
      if (data.success) {
        localStorage.removeItem("email");
        setIsLoggedin(false);
        setUserData(false);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="gtranslate_wrapper"></div>

    <div className={`w-full fixed top-0 left-0 z-50 flex justify-between items-center p-4 sm:p-6 sm:px-24 transition-all duration-300 ${
      isScrolled ? 'bg-white dark:bg-gray-900 shadow-md' : 'bg-transparent'
    }`}>
      
      <button onClick={() => navigate("/")} className="focus:outline-none">
        <img src={assets.kaslogo1} alt="Logo" className='w-10 sm:w-14' />
      </button>
    
      <div className="hidden sm:flex space-x-6 items-center">
        <Link to="/" className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-all relative group">
          Home
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link to="/about" className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-all relative group">
          About
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link to="/contact" className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-all relative group">
          Contact
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </div>

      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="sm:hidden text-2xl text-gray-800 dark:text-white"
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>
    
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="w-2/3 sm:w-1/2 bg-white dark:bg-gray-900 shadow-lg h-full p-6 flex flex-col">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="self-end text-gray-800 dark:text-white text-2xl"
            >
              <FaTimes />
            </button>
            <nav className="flex flex-col space-y-4 mt-6">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-lg text-gray-800 dark:text-white">Home</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-lg text-gray-800 dark:text-white">About</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-lg text-gray-800 dark:text-white">Contact</Link>
              {userData ? (
                <>
                  <button onClick={() => { navigate("/favorites"); setIsMenuOpen(false); }} className="text-lg text-gray-800 dark:text-white flex items-center gap-2">
                    Favorites
                    {favorites.length > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                        {favorites.length}
                      </span>
                    )}
                  </button>
                  <button onClick={logout} className="text-lg text-gray-800 dark:text-white">Logout</button>
                </>
              ) : (
                <button
                  onClick={() => { navigate('/login'); setIsMenuOpen(false); }}
                  className='text-lg text-gray-800 dark:text-white'
                >
                  Login
                </button>
              )}
            </nav>
          </div>
        </div>
      )}
  
      {userData ? (
        <div className='hidden sm:flex items-center space-x-4'>
          <button onClick={() => navigate("/favorites")} className="hover:opacity-80 relative">
            <FaHeart className='w-6 h-6 text-red-500' />
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                {favorites.length}
              </span>
            )}
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
          className='hidden sm:flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 dark:text-white dark:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all'
        >
          Login <img src={assets.arrow_icon} alt="Arrow Icon" />
        </button>
      )}
      
    </div></>
  );
};

export default Navbar;