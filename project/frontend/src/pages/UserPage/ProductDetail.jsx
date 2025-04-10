import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { ClipLoader } from "react-spinners";
import Footer from "../../components/Footer";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const { data } = await axios.get(`https://kasgroups-1.onrender.com/api/products/${id}`, { withCredentials: true });
        setProduct(data.product);
      } catch (error) {
        console.error("Məhsul tapılmadı:", error);
      } finally {
        setTimeout(() => setLoading(false), 1500);
      }
    };
    fetchProductDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <ClipLoader color="#ffffff" size={60} />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-16">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        <div className="mt-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>


          <p className="mt-4 text-gray-600 text-justify leading-relaxed">{product.description}</p>
        </div>

        {product.pdf && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Məhsulun PDF Sənədi</h2>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <embed src={product.pdf} type="application/pdf" width="100%" height="500px" className="rounded-lg" />
            </div>
            <div className="mt-4">
              <a
                href={product.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all font-semibold"
              >
                PDF-ə bax
              </a>

            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/")}
            className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-all font-semibold"
          >
            Back to Home
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
