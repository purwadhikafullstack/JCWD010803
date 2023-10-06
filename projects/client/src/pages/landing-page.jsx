import React, { useState } from 'react';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer';
import Banner from '../components/banner';
import { AllProperties } from '../components/all-properties';

const LandingPage = () => {

  return (
    <>
      <Navbar/>
      <Banner />
      <AllProperties />
      <Footer />
    </>
  );
};

export default LandingPage;
