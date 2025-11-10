import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import summaryApi from '../common/common'
import { FaStar, FaStarHalf } from "react-icons/fa";
import displayBDCurrency from '../helpers/displayCurrency';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';

const ProductDetails = () => {

  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  });

  const params = useParams();
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");

  //  Show zoom only when hovering
  const [showZoom, setShowZoom] = useState(false);

  const fetchProductDetails = async () => {
    setLoading(true);

    const response = await fetch(summaryApi.productDetails.url, {
      method: summaryApi.productDetails.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        productId: params?.id
      })
    });

    const dataReponse = await response.json();

    setTimeout(() => {
      setData(dataReponse?.data);
      setActiveImage(dataReponse?.data?.productImage[0]);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);


  /** ZOOM HANDLER ✅ FIXED */
  const handleZoomImage = (e) => {
    const zoomBox = document.getElementById("zoomBox");
    if (!zoomBox || !e.target?.getBoundingClientRect) return;

    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    zoomBox.style.backgroundPosition = `${x}% ${y}%`;
  };

  return (
    <div className='container mx-auto p-4'>

      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
        {/* product Image */}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>

          <div
            className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'
            onMouseEnter={() => setShowZoom(true)}
            onMouseLeave={() => setShowZoom(false)}
            onMouseMove={handleZoomImage}
          >
            {/* Main image */}
            <img
              src={activeImage || null}
              className="h-full w-full object-scale-down mix-blend-multiply"
              alt="product"
            />

            {/* Smooth Zoom visibility */}
            <div
              className={`hidden lg:block absolute min-w-[400px] min-h-[400px] bg-slate-200 p-1 -right-[410px] top-0 transition-opacity duration-200 ease-in-out 
              ${showZoom ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
              <div
                id="zoomBox"
                className='w-full h-full min-w-[400px] min-h-[400px] mix-blend-multiply'
                style={{
                  backgroundImage: `url(${activeImage})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "250%",
                  backgroundPosition: "50% 50%",
                }}
              />
            </div>
          </div>

          <div className='h-full'>
            {
              loading ? (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    productImageListLoading.map((el, index) => {
                      return (
                        <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage" + index}>
                        </div>
                      )
                    })
                  }
                </div>

              ) : (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    data?.productImage?.map((imgURL, index) => {
                      return (
                        <div className='h-20 w-20 bg-slate-200 rounded p-1' key={index}>
                          <img
                            src={imgURL}
                            className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer'
                            onMouseEnter={() => setActiveImage(imgURL)}
                            onClick={() => setActiveImage(imgURL)}
                          />
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
          </div>
        </div>

        {/* PRODUCT DETAILS */}
        {
          loading ? (
            <div className='grid gap-1 w-full'>
              <p className='bg-slate-200 animate-pulse  h-6 lg:h-8 w-full rounded-full inline-block'></p>
              <h2 className='text-2xl lg:text-4xl font-medium h-6 lg:h-8  bg-slate-200 animate-pulse w-full'></h2>
              <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8  w-full'></p>
            </div>
          ) :
            (
              <div className='flex flex-col gap-1'>
                <p className='bg-orange-200 px-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
                <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
                <p className='capitalize text-slate-400'>{data?.category}</p>

                <div className='text-orange-600 flex items-center gap-1'>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalf />
                </div>

                <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
                  <p className='text-orange-600'>{displayBDCurrency(data.sellingPrice)}</p>
                  <p className='text-slate-400 line-through'>{displayBDCurrency(data.price)}</p>
                </div>

                <div className='flex items-center gap-3 my-2'>
                  <button className='border-2 cursor-pointer border-orange-600 rounded px-3 py-1 min-w-[120px] text-orange-600 font-medium hover:bg-orange-600 hover:text-white'>Buy</button>
                  <button className='border-2 cursor-pointer border-orange-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-orange-600 hover:text-orange-600 hover:bg-white'>Add To Cart</button>
                </div>

                <div>
                  <p className='text-slate-600 font-medium my-1'>Description : </p>
                  <p>{data?.description}</p>
                </div>
              </div>
            )
        }
      </div>

      {/* Recommended product */}
      {data?.category && (
        <CategoryWiseProductDisplay
          category={data.category}
          heading={"Recommended Product"}
        />
      )}

    </div>
  )
}

export default ProductDetails;
