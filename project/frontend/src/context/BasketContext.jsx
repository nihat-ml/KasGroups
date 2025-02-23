import { createContext, useState, useContext } from "react";

const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [basket, setBasket] = useState([]);

  const addToBasket = (product) => {
    setBasket((prev) => [...prev, product]);
  };

  const removeFromBasket = (id) => {
    setBasket((prev) => prev.filter((item) => item._id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    setBasket((prev) =>
      prev.map((product) =>
        product._id === id ? { ...product, quantity: newQuantity } : product
      )
    );
  };

  return (
    <BasketContext.Provider
      value={{ basket, addToBasket, removeFromBasket, updateQuantity }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => useContext(BasketContext);

