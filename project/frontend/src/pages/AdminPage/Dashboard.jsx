import React from 'react';
import Sidebar from '../../components/Sidebar'; 
import { FaBox, FaUsers, FaChartLine } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DashBoard = () => {
  return (
    <div className="flex">
      <Sidebar /> 
      <div className="flex-1 ml-64 p-8 bg-gray-100">
       
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">Hello Admin</h1>
        <p className="text-xl text-gray-700 mb-6">Welcome to Admin Panel</p>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
       
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Total Products</h3>
            <div className="flex items-center text-4xl text-blue-500">
              <FaBox className="mr-3" />
              <span>120</span>
            </div>
          </div>

      
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Total Users</h3>
            <div className="flex items-center text-4xl text-green-500">
              <FaUsers className="mr-3" />
              <span>56</span>
            </div>
          </div>

          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Sales Overview</h3>
            <div className="flex items-center text-4xl text-yellow-500">
              <FaChartLine className="mr-3" />
              <span>$3,200</span>
            </div>
          </div>
        </div>

      
        <div className="mt-8">
          <Link
            to="/kasadmin123/products"
            className="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all mr-4"
          >
            View Products
          </Link>
         
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
