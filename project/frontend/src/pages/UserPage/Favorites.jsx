import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from "axios";

const FavoritesPage = () => {
  const email = localStorage.getItem("email");
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/favorites/${email}`)
      .then(res => setFavorites(res.data.favorites))
      .catch(error => console.error("Failed to fetch favorites:", error));
  }, [favorites]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/favorites/${id}`);
      setFavorites(favorites.filter(product => product._id !== id));
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow container mx-auto p-6 flex flex-col items-center justify-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Favorite Products</h2>

          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-center text-gray-600 mb-4">No favorite products added yet.</p>
              <button
                onClick={() => navigate("/")}
                className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-all font-semibold"
              >
                Back to Home
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
              {favorites.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all cursor-pointer relative group"
                  onClick={() => navigate(`/product/${product.productId}`)}
                >
                  <div className="absolute top-0 left-0 bg-black text-white text-xs font-bold px-2 py-1 rounded-br-md z-10">
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </div>

                  <div className="w-full h-56 overflow-hidden rounded-md relative">
                    <img
                      src={product.image || "http://localhost:4000/uploads/default-image.jpg"}
                      alt={product.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-gray-600 mt-1">{product.price} AZN</p>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <button
                      className="text-red-500 hover:text-red-700 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(product._id);
                      }}
                    >
                      <FaTrash className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {favorites.length > 0 && (
            <button
              onClick={() => navigate("/")}
              className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-all font-semibold mt-6"
            >
              Back to Home
            </button>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FavoritesPage;