import placeholderImage from '../assets/images/placeholder.jpg'

import React from 'react';

const Avatar = () => {
  return (
    <img 
      className="rounded-full"
      height="30"
      width="30"
      alt="Avatar"
      src={placeholderImage}
    />
  );
};

export default Avatar;
