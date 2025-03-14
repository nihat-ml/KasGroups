import React from 'react';
import { useNavigate } from 'react-router-dom';

const NoPage = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-4xl font-semibold text-gray-800 mb-4">Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-6">Sorry, this page doesn't exist!</p>
        <button
          onClick={goHome}
          className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default NoPage;
