import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import bgImage from '../assets/bg_img.png'; 
import Slider from '../components/Slider';
import OurServices from '../components/OurServices';
import QualitySection from '../components/QualitySection';

import Product from '../components/Product';
import { ClipLoader } from 'react-spinners';
import Footer from '../components/Footer';

const Home = () => {
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
    
      <div className='flex flex-col items-center justify-center min-h-screen' style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Navbar/>
        <Header/>
        <Slider/>
        <OurServices/>
        <QualitySection/>
        <Product/>
        <Footer/>
      </div>
    
  );
};

export default Home;
