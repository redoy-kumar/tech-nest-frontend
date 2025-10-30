import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt, FaSpinner } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
import { toast } from "react-toastify";
import DisplayProductImage from "./DiaplayProductImage";
import { MdDelete } from "react-icons/md";
import summaryApi from "../common/common";

const AdminEditProduct = ({ onClose, productData, fetchData }) => {
  const [data, setData] = useState({
    ...productData,
    productName: productData?.productName || "",
    brandName: productData?.brandName || "",
    category: productData?.category || "",
    productImage: productData?.productImage || [],
    description: productData?.description || "",
    price: productData?.price || "",
    sellingPrice: productData?.sellingPrice || "",
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [openFullScreen, setOpenFullScreen] = useState(false);

  //  Handle Input Fields
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  //  Handle File Selection (for new uploads)
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setSelectedFiles((prev) => [...prev, ...files]);
    const localPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...localPreviews]);
  };

  //  Delete new preview image
  const handleDeleteProductImage = (index) => {
    const newPreviewImages = [...previewImages];
    newPreviewImages.splice(index, 1);

    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles.splice(index, 1);

    setPreviewImages(newPreviewImages);
    setSelectedFiles(newSelectedFiles);
  };

  //  Delete existing product image
  const handleDeleteExistingImage = (index) => {
    const updated = data.productImage.filter((_, i) => i !== index);
    setData((prev) => ({ ...prev, productImage: updated }));
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !data.productName ||
      !data.brandName ||
      !data.category ||
      !data.price ||
      !data.sellingPrice ||
      !data.description
    ) {
      toast.error("Please fill all required fields!");
      return;
    }

    try {
      setLoading(true);

      let cloudinaryUrls = [];

      // If new images selected → upload them to Cloudinary
      if (selectedFiles.length > 0) {
        const uploadedResults = await Promise.all(
          selectedFiles.map((file) => uploadImage(file))
        );
        cloudinaryUrls = uploadedResults
          .map((r) => r.secure_url)
          .filter(Boolean);
      }

      // Merge existing + new images
      const finalImages = [...data.productImage, ...cloudinaryUrls];

      // Prepare final data
      const finalData = { ...data, productImage: finalImages };

      // Send to backend
      const res = await fetch(summaryApi.updateProduct.url, {
        method: summaryApi.updateProduct.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      const responseData = await res.json();

      if (res.ok && responseData.success) {
        toast.success(responseData.message);
        onClose();
        fetchData();
      } else {
        toast.error(responseData.message || "Update failed!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return ( 
    <div className="fixed inset-0 bg-slate-200/40 flex justify-center items-center z-50">
      <div className="bg-white shadow-lg rounded w-full max-w-2xl max-h-[90%] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
          <h2 className="font-bold text-lg text-center">Edit Product</h2>
          <div
            className="text-2xl hover:text-red-500 cursor-pointer"
            onClick={onClose}
          >
            <IoCloseSharp />
          </div>
        </div>

        {/* Form */}
        <form className="grid gap-3 p-4" onSubmit={handleSubmit}>
          {/* Product Name */}
          <label className="font-medium">Product Name:</label>
          <input
            type="text"
            name="productName"
            placeholder="Enter product name"
            value={data.productName}
            onChange={handleOnChange}
            className="p-2 rounded bg-slate-100 border"
          />

          {/* Brand Name */}
          <label className="font-medium">Brand Name:</label>
          <input
            type="text"
            name="brandName"
            placeholder="Enter brand name"
            value={data.brandName}
            onChange={handleOnChange}
            className="p-2 rounded bg-slate-100 border"
          />

          {/* Category */}
          <label className="font-medium">Category:</label>
          <select
            name="category"
            value={data.category}
            onChange={handleOnChange}
            className="p-2 rounded bg-slate-100 border"
          >
            <option value="">Select category</option>
            {productCategory.map((el, index) => (
              <option key={index + el.value} value={el.value}>
                {el.label}
              </option>
            ))}
          </select>

          {/* Upload New Images */}
          <label className="font-medium">Add New Images:</label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 cursor-pointer border rounded h-32 w-full flex justify-center items-center">
              <div className="text-slate-500 gap-1 flex flex-col justify-center items-center">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">
                  {selectedFiles.length > 0
                    ? selectedFiles.map((f) => f.name).join(", ")
                    : "Upload Product Images"}
                </p>
                <input
                  type="file"
                  className="hidden"
                  id="uploadImageInput"
                  accept="image/*"
                  multiple
                  onChange={handleFileSelect}
                />
              </div>
            </div>
          </label>

          {/* Existing + New Preview Images */}
          {(data.productImage.length > 0 || previewImages.length > 0) ? (
            <div className="grid grid-cols-3 gap-2 mt-2">
              {/* Existing Images */}
              {data.productImage.map((img, idx) => (
                <div className="relative group" key={`existing-${idx}`}>
                  <img
                    src={img}
                    alt={`existing-${idx}`}
                    width={80}
                    height={80}
                    className="bg-slate-100 border rounded h-24 w-full object-cover cursor-pointer"
                    onClick={() => {
                      setOpenFullScreen(true);
                      setFullScreenImage(img);
                    }}
                  />
                  <div
                    className="absolute hidden group-hover:block bottom-0 right-0 p-1 cursor-pointer bg-red-500 text-white rounded-full"
                    onClick={() => handleDeleteExistingImage(idx)}
                  >
                    <MdDelete />
                  </div>
                </div>
              ))}

              {/* New Images */}
              {previewImages.map((img, idx) => (
                <div className="relative group" key={`preview-${idx}`}>
                  <img
                    src={img}
                    alt={`preview-${idx}`}
                    width={80}
                    height={80}
                    className="bg-slate-100 border rounded h-24 w-full object-cover cursor-pointer"
                    onClick={() => {
                      setOpenFullScreen(true);
                      setFullScreenImage(img);
                    }}
                  />
                  <div
                    className="absolute hidden group-hover:block bottom-0 right-0 p-1 cursor-pointer bg-red-500 text-white rounded-full"
                    onClick={() => handleDeleteProductImage(idx)}
                  >
                    <MdDelete />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-red-500">*please select product image</p>
          )}

          {/* Product Price */}
          <label className="font-medium">Price:</label>
          <input
            type="number"
            name="price"
            placeholder="Enter price"
            value={data.price}
            onChange={handleOnChange}
            className="p-2 rounded bg-slate-100 border"
          />

          {/* Selling Price */}
          <label className="font-medium">Selling Price:</label>
          <input
            type="number"
            name="sellingPrice"
            placeholder="Enter price"
            value={data.sellingPrice}
            onChange={handleOnChange}
            className="p-2 rounded bg-slate-100 border"
          />

          {/* Description */}
          <label className="font-medium">Description:</label>
          <textarea
            name="description"
            rows={3}
            value={data.description}
            onChange={handleOnChange}
            className="h-28 bg-slate-100 border resize-none p-1"
            placeholder="Enter product description"
          ></textarea>

          {/* Submit */}
          <button
            type="submit"
            className="px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-md hover:from-orange-600 hover:to-orange-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin text-white text-lg" />
                Updating...
              </>
            ) : (
              "Update Product"
            )}
          </button>
        </form>
      </div>

      {/* Full-Screen Image */}
      {openFullScreen && (
        <DisplayProductImage
          onClose={() => setOpenFullScreen(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default AdminEditProduct;
