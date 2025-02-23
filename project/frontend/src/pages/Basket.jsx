import React from "react";
import { useBasket } from "../context/BasketContext";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const BasketPage = () => {
  const { basket, removeFromBasket, updateQuantity } = useBasket();
  const navigate = useNavigate();

  
  const totalAmount = basket.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(2);

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow container mx-auto p-6 flex flex-col items-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Shopping Basket</h2>

          {basket.length === 0 ? (
            <p className="text-center text-gray-600">Your basket is empty.</p>
          ) : (
            <div className="w-full max-w-4xl space-y-6">
              {basket.map((product) => (
                <div key={product._id} className="flex items-center justify-between bg-white shadow-md p-4 rounded-lg">
                  
                 
                  <div className="w-24 h-24 overflow-hidden rounded-md">
                    <img
                      src={product.image || "http://localhost:4000/uploads/default-image.jpg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  
                  <div className="flex-1 ml-4">
                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-gray-600 mt-1">Qiymət: {product.price} AZN</p>
                    
                  </div>

                 
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => updateQuantity(product._id, product.quantity - 1)}
                      className="bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300"
                      disabled={product.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold">{product.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(product._id, product.quantity + 1)}
                      className="bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>

                  
                  <p className="text-xl font-bold text-green-600">
                    {(product.price * product.quantity).toFixed(2)} AZN
                  </p>

                 
                  <button
                    onClick={() => removeFromBasket(product._id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <FaTrash className="w-6 h-6" />
                  </button>
                </div>
              ))}

              
              <div className="text-right text-xl font-bold mt-4">
                Total: <span className="text-blue-600">{totalAmount} AZN</span>
              </div>
            </div>
          )}

          <button
            onClick={() => navigate("/")}
            className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-all font-semibold mt-6"
          >
            Back to Home
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BasketPage;
