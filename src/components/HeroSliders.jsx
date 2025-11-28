import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  { src: "https://i.ibb.co.com/xKH83Hgw/slider3.png", alt: "Hero 1" },
  { src: "https://i.ibb.co.com/tPFGt9Tr/slider5.png", alt: "Hero 2" },
  { src: "https://i.ibb.co.com/0y7YH6b5/pexels-slider.jpg", alt: "Hero 3" },
];

const HeroSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false,
  };

  return (
    <div className="w-full h-lvh md:h-1/2 relative nunito-original">
      <Slider {...settings}>
        {images.map((img, idx) => (
          <div key={idx}>
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-lvh md:h-1/2 object-cover"
            />
          </div>
        ))}
      </Slider>

      {/* Optionally overlay text */}
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-center text-white px-4">
        <h1 className="text-5xl md:text-6xl lg:text-8xl  font-bold drop-shadow-lg  ">
          Welcome to <span className="text-green-100">KrishiLink</span>
        </h1>
        <p className="mt-2 text-xl md:text-3xl drop-shadow-md">
          Connecting farmers and buyers...
        </p>
      </div>
    </div>
  );
};

export default HeroSlider;
