import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingBasket } from "react-icons/fa";
import axios from "axios";
import { useFavorites } from "../context/FavoritesContext";
import { useBasket } from "../context/BasketContext";

const Product = () => {
  const navigate = useNavigate();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const { basket, addToBasket, removeFromBasket } = useBasket();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("all");

  // Məhsulları yüklə
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/products");
        setProducts(data.products);
        setFilteredProducts(data.products);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Axtarış, kateqoriya və sıralama üzrə filtrlə
  useEffect(() => {
    let filtered = products;

    // Axtarış sorğusuna görə filtrlə
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Kateqoriyaya görə filtrlə
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Qiymətə görə sırala
    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products, sortOrder]);

  // Kateqoriyaları əldə et
  const categories = ["All", ...new Set(products.map((product) => product.category))];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Our Products</h2>

      {/* Axtarış və filtrləmə */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-md flex-grow"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="all">All</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all cursor-pointer relative group"
            onClick={() => navigate(`/product/${product._id}`)}
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

             
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-lg font-bold">Learn More</p>
              </div>
            </div>

            
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-gray-600 mt-1">{product.price} AZN</p>
            </div>

            <div className="flex justify-between items-center mt-4">
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  favorites.find((fav) => fav._id === product._id)
                    ? removeFromFavorites(product._id)
                    : addToFavorites(product);
                }}
                className={`transition-colors ${favorites.find((fav) => fav._id === product._id) ? "text-red-500" : "text-gray-500"} hover:text-red-700`}
              >
                <FaHeart className="w-6 h-6" />
              </button>

              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  basket.find((item) => item._id === product._id)
                    ? removeFromBasket(product._id)
                    : addToBasket(product);
                }}
                className={`transition-colors ${basket.find((item) => item._id === product._id) ? "text-blue-500" : "text-gray-500"} hover:text-blue-700`}
              >
                <FaShoppingBasket className="w-6 h-6" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;