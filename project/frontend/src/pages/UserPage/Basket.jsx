import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // useNavigate düzəldildi
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const Basket = () => {
  const [basket, setBasket] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  async function GetAllBasket() {
    const basketResponse = await axios.get(`http://localhost:4000/api/basket/${email}`);
    const basketTotalPrice = await axios.get(`http://localhost:4000/api/basket/totalprice/${email}`);

    setBasket(basketResponse.data.basket);
    setTotalPrice(basketTotalPrice.data.basketPrice[0]?.productTotalPrice || 0);
  }

  useEffect(() => {
    GetAllBasket();
  }, [basket]);

  async function HandleAddBasket(product) {
    try {
      if (!email) {
        console.error("Xəta: Email dəyəri undefined!");
        return;
      }

      const basketResponse = await axios.get(`http://localhost:4000/api/basket/${email}`);
      const basketItems = Array.isArray(basketResponse.data.basket) ? basketResponse.data.basket : [];

      const basketItem = basketItems.find(item => item.name === product.name);

      if (basketItem) {
        const updatedProduct = {
          ...product,
          email,
          totalPrice: basketItem.totalPrice + product.price
        };

        await axios.post("http://localhost:4000/api/basket/add", updatedProduct);
      } else {
        const newProduct = {
          ...product,
          email,
          count: 1,
          totalPrice: product.price
        };

        await axios.post("http://localhost:4000/api/basket/add", newProduct);
      }

      await updateTotalBasketPrice(basketItems, product.price);
    } catch (err) {
      console.error("Error handling basket:", err);
    }
  }

  async function updateTotalBasketPrice(basketItems, newProductPrice) {
    try {
      if (!email) {
        throw new Error("Email is required for updating the total basket price.");
      }

      const validBasketItems = Array.isArray(basketItems) ? basketItems : [];

      const totalProductPrice = validBasketItems.reduce((acc, item) => acc + item.price * item.count, 0) + newProductPrice;

      const updatedTotalProduct = { email, productTotalPrice: totalProductPrice };
      await axios.post("http://localhost:4000/api/basket/add/totalprice", updatedTotalProduct);
    } catch (err) {
      console.error("Error updating total basket price:", err);
    }
  }

  async function HandleCountRemoveBasket(product) {
    try {
      if (!email) {
        console.error("Xəta: Email dəyəri undefined!");
        return;
      }

      const basketResponse = await axios.get(`http://localhost:4000/api/basket/${email}`);
      const basketItems = Array.isArray(basketResponse.data.basket) ? basketResponse.data.basket : [];

      const newProduct = {
        name: product.name,
        email,
        price: product.price
      };

      await axios.post("http://localhost:4000/api/basket/removecount", newProduct);

      await updateTotalBasketPriceDecrease(basketItems, product.count, product.price);
    } catch (err) {
      console.error("Error handling basket:", err);
    }
  }

  async function updateTotalBasketPriceDecrease(basketItems, count, newProductPrice) {
    try {
      if (!email) {
        throw new Error("Email is required for updating the total basket price.");
      }

      const validBasketItems = Array.isArray(basketItems) ? basketItems : [];
      

      const totalProductPrice = Math.max(
        validBasketItems.reduce((acc, item) => acc + item.price * item.count, 0) - newProductPrice,
        0
      );

      const updatedTotalProduct = { email, productTotalPrice: totalProductPrice };
      await axios.post("http://localhost:4000/api/basket/add/totalprice", updatedTotalProduct);
    } catch (err) {
      console.error("Error updating total basket price:", err);
    }
  }

  async function updateTotalBasketPriceReset(basketItems, count, newProductPrice) {
    try {
      if (!email) {
        throw new Error("Email is required for updating the total basket price.");
      }

      const validBasketItems = Array.isArray(basketItems) ? basketItems : [];

      

      const totalProductPrice = Math.max(
        validBasketItems.reduce((acc, item) => acc + item.price * item.count, 0) - (count * newProductPrice),
        0
      );


      const updatedTotalProduct = { email, productTotalPrice: totalProductPrice };
      await axios.post("http://localhost:4000/api/basket/add/totalprice", updatedTotalProduct);
    } catch (err) {
      console.error("Error updating total basket price:", err);
    }
  }

  async function DeleteBasket(product) {
    const basketResponse = await axios.get(`http://localhost:4000/api/basket/${email}`);
    const basketItems = Array.isArray(basketResponse.data.basket) ? basketResponse.data.basket : [];

    axios.delete(`http://localhost:4000/api/basket/${product._id}`);

    await updateTotalBasketPriceReset(basketItems, product.count, product.price);
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow container mx-auto p-6 flex flex-col items-center justify-center mt-24">
          <h2 className="text-2xl font-bold mb-6">Shopping Basket</h2>

          {basket.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-center text-gray-600 text-xl mb-4">Your basket is empty.</p>
              <Link to="/">
                <button className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-all font-semibold">
                  Back to Home
                </button>
              </Link>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto w-full">
                <table className="w-full border-collapse border border-gray-300 shadow-lg">
                  <thead>
                    <tr className="bg-gray-200 text-left">
                      <th className="p-3 border">Image</th>
                      <th className="p-3 border">Product Name</th>
                      <th className="p-3 border">Price</th>
                      <th className="p-3 border">Count</th>
                      <th className="p-3 border">Total</th>
                      <th className="p-3 border">Action</th>
                    </tr>
                  </thead>

                  {basket.map((item, index) => (
                    <tbody onClick={(e) => { navigate(`/product/${item.productId}`); }} key={index}>
                      <tr className="border hover:bg-gray-100">
                        <td className="p-3 border">
                          <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
                        </td>
                        <td className="p-3 border">{item.name}</td>
                        <td className="p-3 border">{item.price} AZN</td>
                        <td style={{ position: "relative" }} className="p-3 border">
                          <button onClick={(e) => { e.stopPropagation(); HandleCountRemoveBasket(item) }} style={{ position: "absolute", top: "30px", left: "6px" }} className="bg-red-500 hover:bg-red-600 text-white font-bold py-0 px-2 rounded-full shadow-md transition duration-300 transform hover:scale-105">-</button>
                          <p style={{ textAlign: "center" }} > {item.count}</p>
                          <button onClick={(e) => { e.stopPropagation(); HandleAddBasket(item) }} style={{ position: "absolute", top: "30px", right: "6px" }} className="bg-green-500 hover:bg-green-600 text-white font-bold py-0 px-2 rounded-full shadow-md transition duration-300 transform hover:scale-105">
                            +
                          </button>
                        </td>
                        <td className="p-3 border">{item.totalPrice} AZN</td>
                        <td className="p-3 border">
                          <button onClick={(e) => { e.stopPropagation(); DeleteBasket(item) }} className="bg-red-500 text-white px-2 py-2 rounded-md hover:bg-red-600">
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>

              <div className="mt-6 flex justify-between items-center w-full">
                <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
                  <b>Products Total Price: {totalPrice} AZN</b>
                </button>
                <Link to="/" className="text-blue-600 hover:underline">
                  <button className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600">
                    Back to Home
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Basket;