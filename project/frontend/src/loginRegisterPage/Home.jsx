import React from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import bgImage from '../assets/bg_img.png'; 

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen' style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Navbar/>
      <Header/>
    </div>
  );
};

export default Home;