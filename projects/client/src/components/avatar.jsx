import { useSelector } from 'react-redux';
import placeholderImage from '../assets/images/placeholder.jpg'

import React from 'react';

const Avatar = () => {
  const data = useSelector((state) => state.user.value);

  return (
    <img 
      className="rounded-full h-10 w-10"
      // height="30"
      // width="30"
      alt="Avatar"
      src={`${data.profileImg? `http://localhost:8000/avatars/${data.profileImg}` : placeholderImage}`}
    />
  );
};

export default Avatar;
