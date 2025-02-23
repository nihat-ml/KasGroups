import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaHeart, FaShoppingBasket } from "react-icons/fa";
import axios from "axios";
import Navbar from "../components/Navbar";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/api/products/${id}`);
        setProduct(data.product);
      } catch (error) {
        console.error("Məhsul tapılmadı:", error);
      }
    };
    fetchProductDetail();
  }, [id]);

  if (!product) {
    return <p className="text-center text-lg font-semibold">Yüklənir...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-16">
        {/* Məhsul Şəkli */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg"
          />
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition">
              <FaHeart className="text-red-500 w-6 h-6" />
            </button>
            <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition">
              <FaShoppingBasket className="text-blue-500 w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Məhsul Məlumatları */}
        <div className="mt-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-xl text-gray-700 mt-2 font-semibold">Qiymət: <span className="text-blue-600">{product.price} AZN</span></p>
          <p className={`text-lg mt-1 font-semibold ${product.stock > 0 ? "text-green-500" : "text-red-500"}`}>
            Stok: {product.stock > 0 ? "Mövcuddur" : "Tükənib"}
          </p>
          <p className="mt-4 text-gray-600 text-justify leading-relaxed">{product.description}</p>
        </div>

        {/* PDF Faylı */}
        {product.pdf && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Məhsulun PDF Sənədi</h2>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <embed src={product.pdf} type="application/pdf" width="100%" height="500px" className="rounded-lg" />
            </div>
            <div className="mt-4">
              <a
                href={product.pdf}
                download
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all font-semibold"
              >
                PDF-i Yüklə
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetail;