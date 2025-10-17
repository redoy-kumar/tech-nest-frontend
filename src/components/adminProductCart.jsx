import React from 'react';
import { MdOutlineEdit } from "react-icons/md";

const AdminProductCart = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded relative text-center shadow-md w-48">
      <img
        src={data?.productImage[0]}
        alt={data?.productName}
        width={120}
        height={120}
        className="mx-auto mb-2 object-contain"
      />
      <h1 className="text-sm font-semibold">{data.productName}</h1>

      {/* Edit Button (bottom-right corner) */}
      <button
        className="absolute bottom-2 right-2 cursor-pointer p-2 hover:text-white bg-green-200 rounded-full hover:bg-green-600 transition"
      >
        <MdOutlineEdit size={18} />
      </button>
    </div>
  );
};

export default AdminProductCart;
