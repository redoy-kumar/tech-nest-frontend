import React, { useState, useEffect } from 'react';
import summaryApi from '../common/common';
import { Link } from 'react-router-dom';

const CategoryList = () => {

    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCategoryProduct = async () => {
        setLoading(true);
        try {
            const response = await fetch(summaryApi.categoryProduct.url);
            const dataResponse = await response.json();
            setCategoryProduct(dataResponse.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategoryProduct();
    }, []);


    return (
        <div className='container mx-auto p-4'>
            {

                loading ? (
                    <div className='flex justify-center items-center h-40'>
                        {/* Spinner */}
                        <div className='w-16 h-16 border-4 border-t-blue-500 border-b-blue-500 border-l-transparent border-r-transparent rounded-full animate-spin'></div>
                    </div>
                ) : (
                    <div className='flex items-center gap-6 justify-start overflow-x-scroll scrollbar-none'>
                        {categoryProduct.map((product, index) => (
                            <Link to={"/product-category/" + product?.category}
                                key={index}
                                className='p-2 cursor-pointer transform transition duration-300 hover:scale-105'
                            >
                                <div className='h-16 w-16 md:w-24 md:h-24 p-3 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center customShadow'>
                                    <img
                                        src={product?.productImage[0]}
                                        alt={product?.category}
                                        className='h-full object-scale-down hover:scale-110 transition-all mix-blend-multiply'
                                    />
                                </div>
                                <p className='text-center capitalize text-sm md:text-base mt-2 font-medium text-gray-700'>
                                    {product?.category}
                                </p>
                            </Link>
                        ))}
                    </div>
                )}

        </div>
    );
};

export default CategoryList;