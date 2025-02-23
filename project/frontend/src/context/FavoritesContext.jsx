import { createContext, useContext, useState, useEffect } from "react";
import { AppContent } from "./AppContext"; 
import { toast } from "material-react-toastify";
import { useNavigate } from "react-router-dom";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { isLoggedin, userData } = useContext(AppContent); 
  const [favorites, setFavorites] = useState([]);  
  const navigate = useNavigate();

 
  const saveFavoritesToLocalStorage = (favorites) => {
    try {
      if (userData?._id) {
        localStorage.setItem(`favorites_${userData._id}`, JSON.stringify(favorites));
      }
    } catch (error) {
      console.error("Favorites məlumatlarını localStorage-a yazarkən səhv baş verdi:", error);
    }
  };

  
  useEffect(() => {
    if (isLoggedin && userData?._id) {
      try {
        const savedFavorites = localStorage.getItem(`favorites_${userData._id}`);
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        } else {
          setFavorites([]);  
        }
      } catch (error) {
        console.error("Favorites məlumatlarını localStorage-dan yükləyərkən səhv baş verdi:", error);
      }
    }
  }, [isLoggedin, userData]);

 
  useEffect(() => {
    if (isLoggedin && userData?._id) {
      saveFavoritesToLocalStorage(favorites);
    }
  }, [favorites, isLoggedin, userData]); 

 
  const addToFavorites = (product) => {
    if (!isLoggedin) {
      toast.error("Zəhmət olmasa, əvvəlcə giriş edin.");
      navigate("/login");
      return;
    }

    setFavorites((prev) => {
      const isAlreadyFavorite = prev.some(item => item._id === product._id);
      if (isAlreadyFavorite) {
        toast.error("Bu məhsul artıq favorilərinizdədir.");
        return prev;  
      }
      return [...prev, product]; 
    });
  };

  
  const removeFromFavorites = (productId) => {
    setFavorites((prev) => prev.filter((item) => item._id !== productId));  
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  return useContext(FavoritesContext);
};