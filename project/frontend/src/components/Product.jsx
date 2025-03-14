import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingBasket } from "react-icons/fa";
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
      axios.get(`http://localhost:4000/api/favorites/${email}`)
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
        const { data } = await axios.get("http://localhost:4000/api/products");
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
        await axios.post("http://localhost:4000/api/favorites", {
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

    if (sortOrder === "asc") {
      filtered.sort((a, b) => {
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);
        return priceA - priceB;
      });
    } else if (sortOrder === "desc") {
      filtered.sort((a, b) => {
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);
        return priceB - priceA;
      });
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products, sortOrder]);

  const categories = ["All", ...new Set(products.map((product) => product.category))];

  async function HandleAddBasket(product) {
    const email = localStorage.getItem("email");
    try {
      if (!email) {
        notify("Please log in to add to basket!", "error");
      navigate("/login");
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
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Sort by Price</option>
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
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-gray-600 mt-1">{product.price} AZN</p>
            </div>

            <div className="flex justify-between items-center mt-4">
              <button
                className={favorites.some((f) => f._id === product._id) ? "text-red-700 hover:text-red-800" : "text-gray-500 hover:text-red-700"}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToFavorites(product);
                }}
              >
                <FaHeart className="w-6 h-6 transition-colors" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  HandleAddBasket(product);
                }}
                className="text-gray-500 hover:text-blue-700 transition-colors"
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