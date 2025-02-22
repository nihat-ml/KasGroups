import { React, useContext } from 'react';
import { assets } from '../assets/assets';
import { AppContent } from '../context/AppContext';

import "./Header.css";

const Header = () => {
  const { userData } = useContext(AppContent);


  return (
    <div className='flex flex-col justify-center items-center min-h-screen text-center text-gray-800 px-4 opacity-0 animate-fade-in'>
      <img src={assets.header_img} alt=""
        className='w-36 h-36 rounded-full mb-6' />
      <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>
        Hello {userData ? userData.name : " "}
        <img className='w-8 aspect-square' src={assets.hand_wave} alt='' />
      </h1>
      <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>Welcome to Kas Group</h2>
      <p className='mb-8 max-w-md'>Let's start with a quick product tour and we will have you up and running in no time!</p>
      
    </div>
  );
};

export default Header;
