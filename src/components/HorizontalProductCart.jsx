import React, { useEffect, useState } from 'react';
import fetchCategoryByProduct from '../helpers/fetchCategoryWiseProduct';
import displayBDCurrency from '../helpers/displayCurrency';

const HorizontalProductCart = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        const categoryProduct = await fetchCategoryByProduct(category);
        setLoading(false);
        setData(categoryProduct?.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container mx-auto px-3 my-8">
            <h2 className="text-2xl font-semibold py-2">{heading}</h2>

            <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all'>
                {loading ? (
                    <div className="flex gap-4 overflow-x-scroll scrollbar-none py-2">
                        {new Array(5).fill(null).map((_, i) => (
                            <div
                                key={i}
                                className="w-64 h-56 bg-gray-200 animate-pulse rounded-md flex-shrink-0"
                            />
                        ))}
                    </div>
                ) : (
                    data.map((product, index) => {
                        return (
                            <div className='w-full min-w-[280px] md:min-w-[380px] max-w-[280px] md:max-w-[380px] h-36 bg-white rounded-sm shadow flex'>
                                <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]'>
                                    <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all' />
                                </div>
                                <div className='p-4 grid'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                    <p className='capitalize text-slate-500'>{product?.category}</p>
                                    <div className='flex gap-3'>
                                        <p className='text-orange-600 font-medium'>{displayBDCurrency(product?.sellingPrice)}</p>
                                        <p className='text-slate-500 line-through'>{displayBDCurrency(product?.price)}</p>
                                    </div>
                                    <button className='text-sm bg-orange-600 hover:bg-orange-700 text-white px-3 py-0.5 rounded-full' onClick={(e) => handleAddToCart(e, product?._id)}>Add to Cart</button>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>

        </div>
    );
};

export default HorizontalProductCart;
