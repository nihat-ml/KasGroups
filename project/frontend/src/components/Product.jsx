import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("all");
  const [favorites, setFavorites] = useState([]);
  const email = localStorage.getItem("email");
  const notify = (message, type = "success") => {
    if (type === "success") {
      toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } else {
      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    if (email) {
      axios.get(`https://kasgroups-1.onrender.com/api/favorites/${email}`,{withCredentials: true})
        .then(res => {
          setFavorites(res.data.favorites || []);
        })
        .catch(error => {
          console.error("Favorites fetch error:", error);
          setFavorites([]);
        });
    }
  }, [email]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("https://kasgroups-1.onrender.com/api/products",{withCredentials: true});
        setProducts(data.products);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToFavorites = async (product) => {
    const email = localStorage.getItem("email");
    if (!email) {
      notify("Please log in to add favorites!", "error");
      navigate("/login");
      return;
    }

    try {
      const favorite = favorites.find((f) => f._id === product._id);
      if (favorite) {
        notify("This product is already in your favorites.", "error");
      } else {
        await axios.post("https://kasgroups-1.onrender.com/api/favorites",{withCredentials: true}, {
          productId: product._id,
          name: product.name,
          price: product.price,
          description: product.description,
          stock: product.stock,
          category: product.category,
          image: product.image,
          pdf: product.pdf,
          email,
        });
        setFavorites([...favorites, product]);
      }
    } catch (error) {
      notify("Failed to add favorite!", "error");
    }
  };

  useEffect(() => {
    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }


    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products, sortOrder]);

  const categories = ["All", ...new Set(products.map((product) => product.category))];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Our Products</h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-md flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all cursor-pointer relative group"
            onClick={() => navigate(`/product/${product._id}`)}
          >

            <div className="w-full h-56 overflow-hidden rounded-md relative">
              <img
                src={product.image || "https://kasgroups-1.onrender.com/uploads/default-image.jpg"}
                alt={product.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform"
              />
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              
            </div>
            <button
                className={favorites.some((f) => f._id === product._id) ? "text-red-700 hover:text-red-800" : "text-gray-500 hover:text-red-700"}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToFavorites(product);
                }}
              >
                <FaHeart className="w-6 h-6 transition-colors" />
              </button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;