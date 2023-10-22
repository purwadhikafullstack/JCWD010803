import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import BannerImage from "../assets/images/banner2.png";
import BannerImage2 from "../assets/images/banner1.png";
import BannerImage3 from "../assets/images/banner3.png";
import BannerImage4 from "../assets/images/4.png";
import BannerImage5 from "../assets/images/5.png";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((currentSlide + 1) % 5);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [currentSlide]);

  return (
    <Carousel
      showArrows={false}
      showThumbs={false}
      selectedItem={currentSlide}
      infiniteLoop={true}
      autoPlay={true}
      stopOnHover={true}
      interval={5000}
    >
      <div className="relative bg-cover bg-center h-auto text-white pt-32 px-auto object-fill">
        <a
          href=""
          style={{ display: "block", width: "100%", height: "100%" }}
        >
          <img
            src={BannerImage}
            alt="Banner"
            className="object-cover w-full h-auto cursor-pointer"
          />
        </a>
      </div>
      <div className="relative bg-cover bg-center h-auto text-white pt-32 px-auto object-fill">
        <a
          href=""
          style={{ display: "block", width: "100%", height: "100%" }}
        >
          <img
            src={BannerImage2}
            alt="Banner"
            className="object-cover w-full h-auto cursor-pointer"
          />
        </a>
      </div>  
      <div className="relative bg-cover bg-center h-auto text-white pt-32 px-auto object-fill">
        <a
          href=""
          style={{ display: "block", width: "100%", height: "100%" }}
        >
          <img
            src={BannerImage3}
            alt="Banner"
            className="object-cover w-full h-auto cursor-pointer"
          />
        </a>
      </div>  
      <div className="relative bg-cover bg-center h-auto text-white pt-32 px-auto object-fill">
        <a
          href=""
          style={{ display: "block", width: "100%", height: "100%" }}
        >
          <img
            src={BannerImage4}
            alt="Banner"
            className="object-cover w-full h-auto cursor-pointer"
          />
        </a>
      </div>  
      <div className="relative bg-cover bg-center h-auto text-white pt-32 px-auto object-fill">
        <a
          href=""
          style={{ display: "block", width: "100%", height: "100%" }}
        >
          <img
            src={BannerImage5}
            alt="Banner"
            className="object-cover w-full h-auto cursor-pointer"
          />
        </a>
      </div>
    </Carousel>
  );
};

export default Banner;
