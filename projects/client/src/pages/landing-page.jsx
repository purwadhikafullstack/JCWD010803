import React from 'react';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer';
import Banner from '../components/banner';
import SearchModal from '../components/modals/search-modal';



const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Banner/>
      <SearchModal/>
      <Footer/>
    </>
  );
};

export default LandingPage;
