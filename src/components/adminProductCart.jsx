import React, { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import ReactDOM from "react-dom";
import AdminEditProduct from "./AdminEditProduct";
import displayBDCurrency from "../helpers/diaplayCurrency"; 

const AdminProductCart = ({ data, fetchData }) => {
  const [editProduct, setEditProduct] = useState(false);

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 border border-gray-200 p-4 rounded-2xl relative shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-56 text-center">
      {/* Product Image */}
      <div className="flex justify-center items-center h-36 mb-3">
        <img
          src={data?.productImage[0]}
          alt={data?.productName}
          className="h-full w-auto object-contain rounded-lg transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Product Name */}
      <h2 className="text-base font-semibold text-gray-800 truncate mb-1">
        {data.productName}
      </h2>

      {/* Category (optional) */}
      {data.category && (
        <p className="text-xs text-gray-500 italic mb-2">{data.category}</p>
      )}

      {/* Price */}
      <div className="text-lg font-bold text-green-600 mb-3">
        {displayBDCurrency(data.sellingPrice)}
      </div>

      {/* Edit Button */}
      <button
        className="absolute bottom-3 right-3 bg-green-100 text-green-700 hover:bg-green-600 hover:text-white p-2 rounded-full shadow-md transition-all duration-300"
        onClick={() => setEditProduct(true)}
      >
        <MdOutlineEdit size={18} />
      </button>

      {/* Render the modal as a portal (so it's not trapped inside the card) */}
      {editProduct &&
        ReactDOM.createPortal(
          <AdminEditProduct
            productData={data}
            onClose={() => setEditProduct(false)}
            fetchData={fetchData}
          />,
          document.body
        )}
    </div>
  );
};

export default AdminProductCart;
