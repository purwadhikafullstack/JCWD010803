import React from 'react';

const Container = ({ children }) => {
  return React.createElement(
    'div',
    {
      className: 'max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4'
    },
    children
  );
}

export default Container;
