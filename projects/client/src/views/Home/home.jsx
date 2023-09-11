import React from 'react';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer';
import Button from '../../components/button';
import Banner from '../../components/banner';

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Banner/>
      <Footer/>
    </>
  );
};

export default LandingPage;