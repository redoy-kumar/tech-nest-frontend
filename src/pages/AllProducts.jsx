import React, { useState, useEffect } from 'react';
import UploadProduct from '../components/UploadProduct';
import summaryApi from '../common/common';
import AdminProductCart from '../components/adminProductCart';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [loading, setLoading] = useState(true);   //  loading state

  const fetchAllProduct = async () => {
    try {
      setLoading(true);   //  start loading

      const response = await fetch(summaryApi.allProduct.url);
      const dataResponse = await response.json();

      setAllProduct(dataResponse?.data || []);
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);  // stop loading
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div className="h-full">
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Products</h2>
        <button
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden cursor-pointer text-md font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white"
          onClick={() => setOpenUploadProduct(true)}
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
            Upload Product
          </span>
        </button>
      </div>

      {/*  Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-[calc(100vh-190px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent"></div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-auto">
          {allProduct.map((product, index) => (
            <AdminProductCart
              data={product}
              key={index}
              fetchData={fetchAllProduct}
            />
          ))}
        </div>
      )}

      {/* Upload Product section */}
      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchData={fetchAllProduct}
        />
      )}
    </div>
  );
};

export default AllProducts;
