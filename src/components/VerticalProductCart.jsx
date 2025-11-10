import React, { useEffect, useRef, useState } from 'react';
import fetchCategoryByProduct from '../helpers/fetchCategoryWiseProduct';
import displayBDCurrency from '../helpers/displayCurrency';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import addToCart from '../helpers/addToCart';

const VerticalProductCartCard = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef(null);

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryByProduct(category);
    setLoading(false);
    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

 // Scroll Left
    const nextSlide = () => {
        const el = scrollRef.current;
        if (!el) return;

        if (el.scrollLeft <= 0) {
            el.scrollLeft = el.scrollWidth;
        } else {
            el.scrollLeft -= 300;
        }
    };

    // Scroll Right
    const prevSlide = () => {
        const el = scrollRef.current;
        if (!el) return;

        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) {
            el.scrollLeft = 0;
        } else {
            el.scrollLeft += 300;
        }
    };


  return (
    <div className="container mx-auto px-3 my-8">
      <h2 className="text-2xl font-semibold py-2">{heading}</h2>
        
      <div className="relative">
        {/* Arrow Buttons for md and up */}
        {data?.length > 1 && (
          <div className="absolute inset-0 z-10 flex items-center justify-between px-2 pointer-events-none">
            <button
              onClick={prevSlide}
              className="hidden md:block bg-white/60 hover:bg-white text-black p-2 rounded-full shadow active:scale-90 transition pointer-events-auto"
            >
              <FaAngleLeft size={20} />
            </button>

            <button
              onClick={nextSlide}
              className="hidden md:block bg-white/60 hover:bg-white text-black p-2 rounded-full shadow active:scale-90 transition pointer-events-auto"
            >
              <FaAngleRight size={20} />
            </button>
          </div>
        )}

        {/* Products */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-none gap-4 scroll-smooth py-2 px-1 sm:px-2"
        >
          {loading ? (
            new Array(5).fill(null).map((_, i) => (
              <div
                key={i}
                className="w-40 sm:w-52 md:w-64 lg:w-72 h-48 sm:h-56 md:h-64 bg-gray-200 animate-pulse rounded-md flex-shrink-0"
              />
            ))
          ) : (
            data.map((product, index) => (
              <div
                key={index}
                className="
                  w-52 md:w-64 lg:w-72 bg-white rounded-lg shadow flex flex-col overflow-hidden flex-shrink-0
                "
              >
                {/* Image */}
                <div className="bg-slate-200 w-full h-40 sm:h-48 md:h-56 lg:h-72 p-2 flex items-center justify-center">
                  <img
                    src={product.productImage[0]}
                    className="object-scale-down h-full hover:scale-105 transition-all p-2 mix-blend-multiply"
                    alt="product"
                  />
                </div>

                {/* Content */}
                <div className="p-2 sm:p-3 flex flex-col justify-between">
                  <div>
                    <h2 className="font-medium text-sm sm:text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                      {product?.productName}
                    </h2>

                    <p className="capitalize text-slate-500 text-xs sm:text-sm md:text-sm">
                      {product?.category}
                    </p>

                    <div className="flex gap-2 mt-1">
                      <p className="text-orange-600 font-medium text-sm sm:text-base md:text-base">
                        {displayBDCurrency(product?.sellingPrice)}
                      </p>
                      <p className="text-slate-500 line-through text-xs sm:text-sm md:text-sm">
                        {displayBDCurrency(product?.price)}
                      </p>
                    </div>
                  </div>

                  <button
                    className="mt-2 cursor-pointer text-xs sm:text-sm md:text-sm bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded-full "
                    onClick={(e)=>addToCart(e,product?._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default VerticalProductCartCard;
