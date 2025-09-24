import React from 'react';
import { IoCloseSharp } from 'react-icons/io5';

const DisplayProductImage = ({ imgUrl, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="relative bg-white shadow-lg rounded w-full max-w-5xl max-h-[90vh] flex justify-center items-center">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 text-3xl text-gray-700 hover:text-red-500 cursor-pointer"
        >
          <IoCloseSharp />
        </button>

        {/* Image */}
        <div className="flex justify-center items-center w-full h-full p-4">
          <img
            src={imgUrl}
            alt="Product"
            className="max-w-full max-h-[80vh] object-contain rounded shadow"
          />
        </div>

      </div>
    </div>
  );
};

export default DisplayProductImage;
