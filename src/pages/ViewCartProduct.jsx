import React, { useContext, useEffect, useState } from 'react';
import summaryApi from '../common/common'
import Context from '../context/context';
import displayBDCurrency from '../helpers/displayCurrency'
import { MdDelete } from "react-icons/md";

const ViewCartProduct = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const context = useContext(Context)
    const loadingCart = new Array(context.cartProductCount.count || 0).fill(null)


    const fetchData = async () => {
        setLoading(true)
        const response = await fetch(summaryApi.viewAddToCartProduct.url, {
            method: summaryApi.viewAddToCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
        })
        setLoading(false)

        const responseData = await response.json()

        if (responseData.success) {
            setData(responseData.data)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    // Increase product quantity function
    const increaseQty = async (id, qty) => {
        const response = await fetch(summaryApi.updateAddToCartProduct.url, {
            method: summaryApi.updateAddToCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify(
                {
                    _id: id,
                    quantity: qty + 1
                }
            )
        })

        const responseData = await response.json()

        if (responseData.success) {
            fetchData()
        }
    }


    // Decrease product quantity function
    const decreaseQty = async (id, qty) => {
        if (qty >= 2) {
            const response = await fetch(summaryApi.updateAddToCartProduct.url, {
                method: summaryApi.updateAddToCartProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify(
                    {
                        _id: id,
                        quantity: qty - 1
                    }
                )
            })

            const responseData = await response.json()

            if (responseData.success) {
                fetchData()
            }
        }

    }


    // Delete Product Function
    const deleteCartProduct = async (id) => {
        const response = await fetch(summaryApi.deleteAddToCartProduct.url, {
            method: summaryApi.deleteAddToCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify(
                {
                    _id: id
                }
            )
        })

        const responseData = await response.json()

        if (responseData.success) {
            fetchData();
            context.fetchUserAddToCart()
        }
    }

    // Total quantity function
    const totalProduct = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity,0)

    // Total Price 
    const totalPrice = data.reduce((prev, curr) => prev + (curr?.quantity*curr?.productId?.sellingPrice),0)

    return (
        <div className='container mx-auto p-7'>
            <div className='text-center md:text-2xl lg:text-2xl text-lg my-2'>
                {
                    data.length === 0 && !loading && (
                        <p className='bg-white py-5'>No product added.</p>
                    )
                }
            </div>

            <div className='flex flex-col lg:flex-row gap-6 lg:justify-between'>
                {/* View product */}
                <div className='w-full max-w-3xl'>
                    {
                        loading ? (
                            loadingCart?.map((el, index) => {
                                return (
                                    <div key={el + "Add To Cart Loading" + index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
                                    </div>
                                )
                            })

                        ) :
                            (data.map((product, index) => {
                                return (
                                    <div
                                        key={`${product?._id}-${product?.productId?._id}-${index}`}
                                        className="w-full bg-white border border-slate-300 rounded flex h-24 sm:h-28 md:h-32 my-2"
                                    >
                                        {/* PRODUCT IMAGE */}
                                        <div className="w-20 sm:w-24 md:w-32 h-24 sm:h-28 md:h-32 flex-shrink-0 bg-slate-200">
                                            <img
                                                src={product?.productId?.productImage[0]}
                                                className="w-full h-full object-contain mix-blend-multiply"
                                                alt={product?.productId?.productName}
                                            />
                                        </div>

                                        {/* PRODUCT DETAILS */}
                                        <div className="flex-1 px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-2 relative flex flex-col justify-between">
                                            {/* DELETE BUTTON */}
                                            <div className="absolute top-0 right-0 text-red-600 rounded-full p-1 sm:p-2 hover:bg-red-600 hover:text-white cursor-pointer text-sm sm:text-base" onClick={()=>deleteCartProduct(product?._id)}>
                                                <MdDelete />
                                            </div>

                                            {/* TITLE */}
                                            <h2 className="text-sm sm:text-base md:text-lg line-clamp-1">
                                                {product?.productId?.productName}
                                            </h2>

                                            {/* CATEGORY */}
                                            <p className="capitalize text-xs sm:text-sm md:text-base text-slate-500">
                                                {product?.productId?.category}
                                            </p>

                                            {/* PRICES */}
                                            <div className="flex items-center justify-between mt-1">
                                                <p className="text-orange-600 font-medium text-sm sm:text-base md:text-lg">
                                                    {displayBDCurrency(product?.productId?.sellingPrice)}
                                                </p>
                                                <p className="text-slate-600 font-semibold text-sm sm:text-base md:text-lg">
                                                    {displayBDCurrency(
                                                        product?.productId?.sellingPrice * product?.quantity
                                                    )}
                                                </p>
                                            </div>

                                            {/* QUANTITY */}
                                            <div className="flex items-center gap-2 sm:gap-3 mt-1">
                                                <button className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-5 h-5 sm:w-6 sm:h-6 flex justify-center items-center rounded text-xs sm:text-sm" onClick={() => decreaseQty(product?._id, product?.quantity)}>
                                                    -
                                                </button>
                                                <span className="text-sm sm:text-base">{product?.quantity}</span>
                                                <button className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white w-5 h-5 sm:w-6 sm:h-6 flex justify-center items-center rounded text-xs sm:text-sm" onClick={() => increaseQty(product?._id, product?.quantity)}>
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                );
                            })
                            )
                    }
                </div>

                {/* Total product summary*/}
                <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                    {
                        loading ? (
                            <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>

                            </div>
                        ) : (
                            <div className='h-36 bg-white'>
                                <h2 className='text-white bg-orange-600'>Summary</h2>
                                <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                    <p>Quantity</p>
                                    <p>{totalProduct}</p>
                                </div>
                                <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                    <p>Total Price</p>
                                    <p>{displayBDCurrency(totalPrice)}</p>
                                </div>

                                <button className='bg-blue-600 p-2 text-white w-full mt-2'>Payment</button>
                            </div>
                        )
                    }
                </div>

            </div>
        </div>
    );
};

export default ViewCartProduct;