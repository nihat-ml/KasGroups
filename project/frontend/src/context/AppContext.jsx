import axios from "axios";
import { toast } from "material-react-toastify";
import { createContext, useEffect, useState } from "react";

export const AppContent = createContext();

export const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

  // LocalStorage-dan istifadəçinin giriş məlumatlarını oxumaq
  const loadUserDataFromLocalStorage = () => {
    const storedIsLoggedin = localStorage.getItem("isLoggedin");
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    
    if (storedIsLoggedin === "true" && storedUserData) {
      setIsLoggedin(true);
      setUserData(storedUserData);
    }
  };

  // Auth məlumatlarını əldə etmək
  const getAuthState = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/is-auth");
      if (data.success) {
        setIsLoggedin(true);
        getUserData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // İstifadəçi məlumatlarını serverdən əldə etmək
  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data");
      if (data.success) {
        setUserData(data.userData);
        // User data-ı localStorage-da saxlamaq
        localStorage.setItem("userData", JSON.stringify(data.userData));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    loadUserDataFromLocalStorage(); // Səhifə yükləndikdə localStorage-dan istifadəçi məlumatlarını yükləyirik
    if (!isLoggedin) {
      getAuthState(); // Auth məlumatlarını yoxlamaq
    }
  }, []);

  // Giriş state-in dəyişməsi
  useEffect(() => {
    if (isLoggedin && userData) {
      // localStorage-da isLoggedin məlumatını saxlamaq
      localStorage.setItem("isLoggedin", "true");
    } else {
      localStorage.removeItem("isLoggedin");
      localStorage.removeItem("userData");
    }
  }, [isLoggedin, userData]);

  const value = {
    backendUrl,
    isLoggedin, 
    setIsLoggedin,
    userData, 
    setUserData,
    getUserData
  };

  return (
    <AppContent.Provider value={value}>
      {props.children}
    </AppContent.Provider>
  );
};
