import { createContext, useContext, useState, useEffect } from "react";
import { AppContent } from "./AppContext"; 
import { toast } from "material-react-toastify";
import { useNavigate } from "react-router-dom";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { isLoggedin, userData } = useContext(AppContent); // Istifadəçi məlumatları
  const [favorites, setFavorites] = useState([]);  // Favorites üçün state
  const navigate = useNavigate();

  // localStorage-a favoritləri yazma funksiyası
  const saveFavoritesToLocalStorage = (favorites) => {
    try {
      if (userData?._id) {
        localStorage.setItem(`favorites_${userData._id}`, JSON.stringify(favorites));
      }
    } catch (error) {
      console.error("Favorites məlumatlarını localStorage-a yazarkən səhv baş verdi:", error);
    }
  };

  // İstifadəçi login olduqda, `localStorage`-dan favoritləri yükləyirik
  useEffect(() => {
    if (isLoggedin && userData?._id) {
      try {
        const savedFavorites = localStorage.getItem(`favorites_${userData._id}`);
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        } else {
          setFavorites([]);  // Əgər LocalStorage-da heç bir favorit yoxdursa, boş array təyin et
        }
      } catch (error) {
        console.error("Favorites məlumatlarını localStorage-dan yükləyərkən səhv baş verdi:", error);
      }
    }
  }, [isLoggedin, userData]);

  // Favorites dəyişdikcə localStorage-a yazmaq
  useEffect(() => {
    if (isLoggedin && userData?._id) {
      saveFavoritesToLocalStorage(favorites);
    }
  }, [favorites, isLoggedin, userData]); // Favorites state dəyişdikdə, onu localStorage-a yazırıq

  // Sevimli məhsul əlavə edirik
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
        return prev;  // Əgər artıq favoritdədirsə, heç bir şey etmirik
      }
      return [...prev, product]; // Məhsulu favoritlərə əlavə edirik
    });
  };

  // Sevimli məhsuldan çıxarırıq
  const removeFromFavorites = (productId) => {
    setFavorites((prev) => prev.filter((item) => item._id !== productId));  // Məhsulu favoritlərdən çıxarırıq
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