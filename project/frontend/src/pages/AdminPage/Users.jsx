import React from "react";
import { Link } from "react-router-dom";

const Users = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">Coming Soon...</h2>
      <Link to="/admin/dashboard" className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">
        Back to Admin Panel
      </Link>
    </div>
  );
};

export default Users;
