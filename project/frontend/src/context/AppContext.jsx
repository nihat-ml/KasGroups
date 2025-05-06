import axios from "axios";
import { toast } from "material-react-toastify";
import { createContext, useEffect, useState } from "react";

export const AppContent = createContext();

export const AppContextProvider = (props) => {
  // Configure axios globally to handle cookies
  axios.defaults.withCredentials = true;
  
  const backendUrl = "https://kasgroups-1.onrender.com";
  
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);
  
  const loadUserDataFromLocalStorage = () => {
    const storedIsLoggedin = localStorage.getItem("isLoggedin");
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    
    if (storedIsLoggedin === "true" && storedUserData) {
      setIsLoggedin(true);
      setUserData(storedUserData);
    }
  };
 
  const getAuthState = async () => {
    try {
      console.log("Checking auth state...");
      const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`, {
        withCredentials: true,
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      console.log("Auth state response:", data);
      if (data.success) {
        setIsLoggedin(true);
        getUserData();
      }
    } catch (error) {
      console.error("Auth state error:", error);
      toast.error(error.message);
    }
  };
 
  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`, {
        withCredentials: true,
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      if (data.success) {
        setUserData(data.userData);
        localStorage.setItem("userData", JSON.stringify(data.userData));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("User data error:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    loadUserDataFromLocalStorage(); 
    if (!isLoggedin) {
      getAuthState(); 
    }
  }, []);

  useEffect(() => {
    if (isLoggedin && userData) {
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
