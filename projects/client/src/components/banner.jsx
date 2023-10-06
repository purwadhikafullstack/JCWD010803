import React from 'react';
import BannerImage from '../assets/images/banner2.png';

const Banner = () => {
  return (
    <div className="relative bg-cover bg-center h-auto text-white pt-32 px-auto object-fill">
      <img src={BannerImage} alt="Banner" className="object-cover w-full h-auto" />
      <div className="absolute top-0 right-0 md:w-full flex justify-end items-center h-full md:pr-8 pr-4">
        <a
          href="/register"
          className="bg-gray-800 py-2 md:py-4 px-4 md:px-8 text-white font-bold uppercase text-xs rounded-full hover:bg-teal-500 hover:text-gray-800"
        >
          SignUp Now
        </a>
      </div>
    </div>
    
  );
};

export default Banner;
