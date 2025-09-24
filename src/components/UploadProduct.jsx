import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
import { toast } from "react-toastify";
import DisplayProductImage from "./DiaplayProductImage";

const UploadProduct = ({ onClose }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    selling: "",
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fullScreenImage,setFullScreenImage] = useState("")
  const [openFullScreen,setOpenFullScreen] = useState(false)

  const handleOnChange = (e) => {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setSelectedFiles((prev) => [...prev, ...files]);
    const localPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...localPreviews]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.productName || !data.brandName || !data.category) {
      toast.error("Please fill all required fields!");
      return;
    }

    if (selectedFiles.length === 0) {
      toast.error("Please select at least one product image!");
      return;
    }

    try {
      setLoading(true);

      const uploadPromises = selectedFiles.map((file) => uploadImage(file));
      const uploadedResults = await Promise.all(uploadPromises);

      const cloudinaryUrls = uploadedResults
        .filter((res) => res?.secure_url)
        .map((res) => res.secure_url);

      if (cloudinaryUrls.length === 0) {
        toast.error("Image upload failed!");
        setLoading(false);
        return;
      }

      const finalData = { ...data, productImage: cloudinaryUrls };
      console.log("Final Product Data:", finalData);
      toast.success("Product uploaded successfully!");

      // reset form
      setData({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        selling: "",
      });
      setSelectedFiles([]);
      setPreviewImages([]);
      setLoading(false);
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-200/40 flex justify-center items-center z-50">
      <div className="bg-white shadow-lg rounded w-full max-w-2xl max-h-[90%] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
          <h2 className="font-bold text-lg text-center">Upload Product</h2>
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
          <label htmlFor="productName" className="font-medium">
            Product Name:
          </label>
          <input
            type="text"
            id="productName"
            placeholder="Enter product name"
            value={data.productName}
            onChange={handleOnChange}
            className="p-2 rounded bg-slate-100 border"
          />

          {/* Brand Name */}
          <label htmlFor="brandName" className="font-medium">
            Brand Name:
          </label>
          <input
            type="text"
            id="brandName"
            placeholder="Enter brand name"
            value={data.brandName}
            onChange={handleOnChange}
            className="p-2 rounded bg-slate-100 border"
          />

          {/* Category */}
          <label htmlFor="category" className="font-medium">
            Category:
          </label>
          <select
            id="category"
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

          {/* Upload Images */}
          <label className="font-medium">Product Images:</label>
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

          {/* Preview Images */}
          {previewImages.length > 0 ? (
            <div className="grid grid-cols-3 gap-2 mt-2">
              {previewImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`preview-${idx}`}
                  width={80}
                  height={80}
                  className="bg-slate-100 border rounded h-24 w-full object-cover cursor-pointer"
                  onClick={()=>{
                    setOpenFullScreen(true)
                    setFullScreenImage(img)
                  }}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-red-500">*please select product image</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="px-3 py-3 bg-orange-500 text-white rounded-md cursor-pointer hover:bg-orange-600 disabled:opacity-50 mt-4"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload Product"}
          </button>
        </form>
      </div>


      {/* Display Image Full  Screen*/}
      {
        openFullScreen && (
          <DisplayProductImage onClose={()=>setOpenFullScreen(false)} imgUrl={fullScreenImage} />
        )
      }
      
    </div>
  );
};

export default UploadProduct;
