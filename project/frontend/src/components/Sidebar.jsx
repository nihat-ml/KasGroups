import React from 'react';
import { FaTachometerAlt, FaBox, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white p-6 fixed top-0 left-0">
      <h2 className="text-2xl font-semibold text-center text-gray-100 mb-6">Admin Panel</h2>

      <nav>
        <ul>
         
          <li className="mb-4">
            <Link to="/admin/dashboard" className="flex items-center text-lg hover:text-blue-400">
              <FaTachometerAlt className="mr-3 text-xl" />
              Dashboard
            </Link>
          </li>

          
          <li className="mb-4">
            <Link to="/admin/products" className="flex items-center text-lg hover:text-blue-400">
              <FaBox className="mr-3 text-xl" />
              Products
            </Link>
          </li>

    
          <li className="mb-4">
            <Link to="/admin/users" className="flex items-center text-lg hover:text-blue-400">
              <FaUsers className="mr-3 text-xl" />
              Users
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
