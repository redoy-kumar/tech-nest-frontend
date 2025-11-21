import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productCategory from '../helpers/productCategory';
import VerticalSearchProductCart from '../components/VerticalSearchProductCart';
import summaryApi from '../common/common';

const CategoryProduct = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const urlCategoryListInArray = new URLSearchParams(location.search).getAll("category");

    // Initialize category selections from URL
    const urlCategoryListObject = {};
    urlCategoryListInArray.forEach(categoryName => {
        urlCategoryListObject[categoryName] = true;
    });

    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
    const [filterCategoryList, setFilterCategoryList] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch filtered products
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(summaryApi.filterProduct.url, {
                method: summaryApi.filterProduct.method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ category: filterCategoryList })
            });

            const dataResponse = await response.json();
            setData(dataResponse?.data || []);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }, [filterCategoryList]);

    // Update category list when checkboxes change
    useEffect(() => {
        const arrayOfCategory = Object.keys(selectCategory).filter(key => selectCategory[key]);
        setFilterCategoryList(arrayOfCategory);

        // Update URL
        const params = new URLSearchParams();
        arrayOfCategory.forEach(cat => params.append("category", cat));
        navigate({ search: params.toString() }, { replace: true });

    }, [selectCategory, navigate]);

    // Fetch data when filters change
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Handle category selection
    const handleSelectCategory = (e) => {
        const { value, checked } = e.target;
        setSelectCategory((prev) => ({
            ...prev,
            [value]: checked
        }));
    };

    // Sorting logic
    const [sortBy, setSortBy] = useState("");

    const handleSortChange = (e) => {
        const { value } = e.target;
        setSortBy(value);

        setData((prevData) => {
            const sortedData = [...prevData]; // clone before sorting

            if (value === "asc") {
                sortedData.sort((a, b) => a.sellingPrice - b.sellingPrice);
            } else if (value === "desc") {
                sortedData.sort((a, b) => b.sellingPrice - a.sellingPrice);
            }

            return sortedData;
        });
    };

    return (
        <div className="container mx-auto p-4">

            {/* Desktop Version */}
            <div className="hidden lg:grid" style={{ gridTemplateColumns: "200px 1fr" }}>

                {/* Left side filters */}
                <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">

                    {/* Sort by */}
                    <div>
                        <h3 className='text-base uppercase font-medium border-b pb-1 border-slate-300 text-slate-500'>
                            Sort by
                        </h3>

                        <form className='text-sm flex flex-col gap-2 py-2'>
                            <div className='flex items-center gap-3'>
                                <input
                                    type="radio"
                                    checked={sortBy === "asc"}
                                    value="asc"
                                    name="sortBy"
                                    onChange={handleSortChange}
                                />
                                <label>Price - Low to High</label>
                            </div>

                            <div className='flex items-center gap-3'>
                                <input
                                    type="radio"
                                    checked={sortBy === "desc"}
                                    value="desc"
                                    name="sortBy"
                                    onChange={handleSortChange}
                                />
                                <label>Price - High to Low</label>
                            </div>
                        </form>
                    </div>

                    {/* Filter by category */}
                    <div>
                        <h3 className='text-base uppercase font-medium border-b pb-1 border-slate-300 text-slate-500'>
                            Category by
                        </h3>

                        <form className='text-sm flex flex-col gap-2 py-2'>
                            {productCategory.map((categoryName) => (
                                <div className='flex items-center gap-3' key={categoryName.value}>
                                    <input
                                        type="checkbox"
                                        checked={selectCategory[categoryName.value] || false}
                                        name="category"
                                        id={categoryName.value}
                                        value={categoryName.value}
                                        onChange={handleSelectCategory}
                                    />
                                    <label htmlFor={categoryName.value}>{categoryName.label}</label>
                                </div>
                            ))}
                        </form>
                    </div>
                </div>

                {/* Right side product list */}
                <div className='px-4'>
                    <p className='pl-3 font-medium text-slate-800 text-lg my-2'>
                        Search Results: {data.length}
                    </p>

                    <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
                        {!loading && Array.isArray(data) && (
                            <VerticalSearchProductCart data={data} loading={loading} />
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CategoryProduct;
