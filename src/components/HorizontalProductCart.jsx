import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchCategoryByProduct from '../helpers/fetchCategoryWiseProduct';
import displayBDCurrency from '../helpers/displayCurrency';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context/context';

const HorizontalProductCart = ({ category, heading }) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const scrollRef = useRef(null);

    const { fetchUserAddToCart } = useContext(Context);

    const handleAddToCart = async (e,id) => {
      await addToCart(e,id)
      await fetchUserAddToCart()
    }

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

                {/* Arrow Buttons (only MD+) */}
                {data?.length > 3 && (
                    <div className="absolute inset-0 z-10 md:flex hidden items-center justify-between px-2 pointer-events-none">
                        <button
                            onClick={prevSlide}
                            className="bg-white/60 hover:bg-white text-black p-2 rounded-full shadow active:scale-90 transition pointer-events-auto"
                        >
                            <FaAngleLeft size={20} />
                        </button>

                        <button
                            onClick={nextSlide}
                            className="bg-white/60 hover:bg-white text-black p-2 rounded-full shadow active:scale-90 transition pointer-events-auto"
                        >
                            <FaAngleRight size={20} />
                        </button>
                    </div>
                )}

                {/* Products */}
                <div
                    ref={scrollRef}
                    className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all py-2 scroll-smooth"
                >
                    {loading ? (
                        new Array(5).fill(null).map((_, i) => (
                            <div
                                key={i}
                                className="w-64 h-56 bg-gray-200 animate-pulse rounded-md flex-shrink-0"
                            />
                        ))
                    ) : (
                        data.map((product, index) => (
                            <Link to={"product/"+product?._id}
                                key={index}
                                className="
                                    min-w-[220px] max-w-[260px]
                                    md:min-w-[350px] md:max-w-[380px]
                                    bg-white rounded-lg shadow flex flex-col md:flex-row
                                    overflow-hidden
                                "
                            >
                                {/* Image */}
                                <div className="bg-slate-200 w-full md:min-w-[145px] h-32 md:h-full p-2 flex items-center justify-center">
                                    <img
                                        src={product.productImage[0]}
                                        className="object-contain h-full hover:scale-105 transition-all"
                                        alt="product"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-3 flex flex-col justify-between">
                                    <div>
                                        <h2 className="font-medium text-sm md:text-lg text-ellipsis line-clamp-1 text-black">
                                            {product?.productName}
                                        </h2>

                                        <p className="capitalize text-slate-500 text-xs md:text-sm">
                                            {product?.category}
                                        </p>

                                        <div className="flex gap-2 mt-1">
                                            <p className="text-orange-600 font-medium text-sm md:text-base">
                                                {displayBDCurrency(product?.sellingPrice)}
                                            </p>
                                            <p className="text-slate-500 line-through text-xs md:text-sm">
                                                {displayBDCurrency(product?.price)}
                                            </p>
                                        </div>
                                    </div>

                                    
                                    <button
                                        className="mt-2 cursor-pointer text-xs md:text-sm bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded-full lg:w-fit md:w-fit"
                                        onClick={(e)=>handleAddToCart(e,product?._id)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default HorizontalProductCart;
