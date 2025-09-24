import React, { useState } from 'react';
import UploadProduct from '../components/UploadProduct'

const AllProducts = () => {
    const [openUploadProduct, setOpenUploadProduct] = useState(false);
    return (
        <div>
            <div className='bg-white py-2 px-4 flex justify-between items-center'>
                <h2 className='font-bold text-lg'>All Products</h2>
                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden cursor-pointer text-md font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white" 
                 onClick={()=>setOpenUploadProduct(true)}
                >
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                        Upload Product
                    </span>
                </button>
            </div>


            {/* Upload Product section */}
            {
                openUploadProduct && (
                    <UploadProduct onClose={()=>setOpenUploadProduct(false)} />
                )
            }

        </div >
    );
};

export default AllProducts;