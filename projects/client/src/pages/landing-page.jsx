import React, { useState } from 'react';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer';
import Banner from '../components/banner';

const LandingPage = () => {

  return (
    <>
      <Navbar />
      <Banner />
      <div className='p-20'>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
