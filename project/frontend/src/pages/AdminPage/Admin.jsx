import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const AdminLogin = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username === "nihatML" && formData.password === "admin123") {
      toast.success("Admin logged in successfully!"); 
      setTimeout(() => {
        navigate("/kasadmin123/dashboard"); 
      }, 2000); 
    } else {
      toast.error("Invalid username or password!"); 
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-lg p-8 w-96">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Admin Login</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-3 text-gray-500"
            >
              {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md text-lg font-semibold hover:bg-blue-600 transition-all"
          >
            Login
          </button>
        </form>
      </div>

      <ToastContainer /> 
    </div>
  );
};

export default AdminLogin;
