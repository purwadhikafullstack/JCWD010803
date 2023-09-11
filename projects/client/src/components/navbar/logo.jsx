import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../../assets/images/2.png'

const Logo = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  };

  return (
    <img
      onClick={navigateToHome}
      className="hidden md:block cursor-pointer"
      src={logoImage}
      height="100"
      width="100"
      alt="Logo"
    />
  );
};

export default Logo;
