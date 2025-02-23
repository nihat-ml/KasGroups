import React from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import bgImage from '../assets/bg_img.png'; 
import Slider from '../components/Slider';
import OurServices from '../components/OurServices';
import QualitySection from '../components/QualitySection';
import { DarkModeProvider } from '../context/DarkModeContext';
import Product from '../components/Product';

const Home = () => {
  return (
    <DarkModeProvider>
    <div className='flex flex-col items-center justify-center min-h-screen' style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Navbar/>
      <Header/>
      <Slider/>
      <OurServices/>
      <QualitySection/>
      <Product/>
    </div>
    </DarkModeProvider>
  );
};

export default Home;