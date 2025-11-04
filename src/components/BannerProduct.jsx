import React, { useEffect, useState, useRef } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

import image1 from "../assets/banner/banner 2.jpg";
import image2 from "../assets/banner/banner 3.jpg";
import image3 from "../assets/banner/banner 4.jpg";
import image4 from "../assets/banner/banner 5.jpg";
import image5 from "../assets/banner/banner 6.webp";
import image6 from "../assets/banner/banner 7.jpg";
import image7 from "../assets/banner/banner 8.jpg";

const BannerProduct = () => {
  const images = [image1, image2, image3, image4, image5, image6, image7];

  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  //  Auto-slide
  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, []);

  const startAutoPlay = () => {
    stopAutoPlay();
    intervalRef.current = setInterval(nextSlide, 3000);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
    <div className="container mx-auto px-2 sm:px-4">
      <div
        className="
        relative w-full rounded overflow-hidden bg-black
        h-48 sm:h-64 md:h-72 lg:h-96 xl:h-[450px]
        "
        onMouseEnter={stopAutoPlay}
        onMouseLeave={startAutoPlay}
      >
        {/* Buttons */}
        <div className="absolute inset-0 z-10 flex items-center justify-between px-2">
          <button
            onClick={prevSlide}
            className="bg-white/60 hover:bg-white text-black p-2 rounded-full shadow
            active:scale-90 transition"
          >
            <FaAngleLeft size={20} />
          </button>

          <button
            onClick={nextSlide}
            className="bg-white/60 hover:bg-white text-black p-2 rounded-full shadow
            active:scale-90 transition"
          >
            <FaAngleRight size={20} />
          </button>
        </div>

        {/* Slider images */}
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, i) => (
            <div key={i} className="min-w-full h-full bg-black flex justify-center items-center">
              <img
                src={img}
                alt="banner"
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-20">
          {images.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2.5 h-2.5 rounded-full cursor-pointer transition 
              ${currentIndex === i ? "bg-white" : "bg-white/40"}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
