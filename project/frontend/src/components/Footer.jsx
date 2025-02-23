import React from "react";
import { assets } from '../assets/assets';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa"; 

const Footer = () => {
  
    const scrollToTop = () => {
        const scrollDuration = 2000; 
        const scrollStep = -window.scrollY / (scrollDuration / 15); 
        
        const scrollInterval = setInterval(() => {
          if (window.scrollY <= 0) {
            clearInterval(scrollInterval); 
          }
          window.scrollBy(0, scrollStep); 
        }, 15); 
      };
      

  return (
    <footer className="bg-gray-900 text-white py-12 w-full">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center md:items-start">
       
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
          <img src={assets.kaslogo1} alt="KasGroup Logo" className="w-32 mb-4 md:mb-0" />
        </div>

        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-semibold mb-4 text-center md:text-left">Socials</h3>
          <ul className="flex justify-center md:justify-start gap-6 text-lg">
            <li>
              <a href="https://facebook.com" target="_blank" className="hover:text-gray-400 transition">
                <FaFacebook />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/kas_aliminium?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" className="hover:text-gray-400 transition">
                <FaInstagram />
              </a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank" className="hover:text-gray-400 transition">
                <FaTwitter />
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank" className="hover:text-gray-400 transition">
                <FaLinkedin />
              </a>
            </li>
          </ul>
        </div>

        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p className="text-sm flex items-center gap-2">
            <FaMapMarkerAlt className="text-gray-400" /> Muzaffar Narimanov 4, Baku Azerbaijan
          </p>
          <p className="text-sm flex items-center gap-2">
            <FaPhoneAlt className="text-gray-400" /> (012) 567-4773
          </p>
          <p className="text-sm flex items-center gap-2">
            <FaPhoneAlt className="text-gray-400" /> (055) 200-5707
          </p>
          <p className="text-sm flex items-center gap-2">
            <FaEnvelope className="text-gray-400" /> info@kasgroup.az
          </p>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="fixed bottom-5 right-5 bg-gray-700 p-4 rounded-full shadow-lg hover:bg-gray-600 transition duration-300 transform hover:scale-110"
      >
        ⬆
      </button>
    </footer>
  );
};

export default Footer;
