import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import bgImage from '../../assets/bg_img.png'; 
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ClipLoader } from "react-spinners";

const About = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

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
      <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto p-6 mt-32 bg-white shadow-lg rounded-lg animate-slide-in" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="w-full md:w-1/2">
          <img
            src="https://images.pexels.com/photos/17728785/pexels-photo-17728785/free-photo-of-old-abandoned-factory-somewhere-in-belgium.jpeg"
            alt="Kas Alüminyum"
            className="w-full h-auto rounded-lg"
          />
        </div>

        <div className="w-full md:w-1/2 md:pl-10 mt-6 md:mt-0">
          <h2 className="text-3xl font-bold text-gray-900">KAS ALÜMİNYUM</h2>
          <p className="text-gray-700 mt-4 leading-relaxed">
            2017-ci ildə qurulan <strong>KAS ALÜMİNYUM</strong>, alüminium
            xammalının emalından son məhsula qədər hər mərhələdə yüksək keyfiyyət
            standartlarını qoruyaraq fəaliyyət göstərir. Şirkətimiz, peşəkar və
            təcrübəli Layihə, Satış və Marketinq komandası ilə Azərbaycanın və
            beynəlxalq bazarın önəmli layihələrində iştirak edir.
          </p>
          <p className="text-gray-700 mt-4 leading-relaxed">
            <strong>KAS ALÜMİNYUM</strong> layihələrin səlahiyyətli icraçı
            dilerləri ilə əməkdaşlıq edərək, memarlar, podratçılar, məsləhətçilər
            və işəgötürənlərlə sıx əlaqədə çalışır. Komandamız mütəmadi olaraq
            tikinti sektorunda baş verən yenilikləri izləyir, bazardakı
            tendensiyaları analiz edir və bu bilgiləri biznes tərəfdaşlarına
            təqdim edir.
          </p>
          <p className="text-gray-700 mt-4 leading-relaxed">
            Yenilikçi AR-GE yanaşmamız və <strong>Xüsusi Dizayn</strong> həllərimiz
            sayəsində sənayedə fərqlənirik. Minimalist və estetik sistemlərimiz
            memarlara daha geniş dizayn azadlığı təqdim edir, hər bir layihədə
            mükəmməlliyi təmin etməyi hədəfləyirik.{" "}
            <strong>KAS ALÜMİNYUM</strong> keyfiyyət və innovasiyanı özündə
            birləşdirən sistem həlləri ilə inşaat sektorunda etibarlı
            tərəfdaşınızdır.
          </p>
        </div>
      </div>
      
      <div className="mt-8 flex justify-center"> 
        <button
          onClick={() => navigate("/")}
          className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-all font-semibold"
        >
          Back to Home
        </button>
      </div>

      <Footer />
    </>
  );
};

export default About;
