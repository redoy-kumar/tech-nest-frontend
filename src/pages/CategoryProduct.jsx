import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import productCategory from '../helpers/productCategory';
import VerticalSearchProductCart from '../components/VerticalSearchProductCart';
import summaryApi from '../common/common';

const CategoryProduct = () => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const urlCategoryListInArray = new URLSearchParams(location.search).getAll("category");

    // Initialize selected categories from URL
    const urlCategoryListObject = {};
    urlCategoryListInArray.forEach(categoryName => {
        urlCategoryListObject[categoryName] = true;
    });

    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
    const [filterCategoryList, setFilterCategoryList] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch data function
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

    // Update filterCategoryList and URL when selectCategory changes
    useEffect(() => {
        const arrayOfCategory = Object.keys(selectCategory).filter(
            key => selectCategory[key]
        );

        setFilterCategoryList(arrayOfCategory);

        // Update URL query string
        const params = new URLSearchParams();
        arrayOfCategory.forEach(cat => params.append("category", cat));
        navigate({ search: params.toString() }, { replace: true });

    }, [selectCategory, navigate]);

    // Fetch data whenever filterCategoryList changes
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Handle checkbox change
    const handleSelectCategory = (e) => {
        const { value, checked } = e.target;
        setSelectCategory((prev) => ({
            ...prev,
            [value]: checked
        }));
    };

    return (
        <div className="container mx-auto p-4">

            {/* Desktop version */}
            <div className="hidden lg:grid" style={{ gridTemplateColumns: "200px 1fr" }}>

                {/* left side */}
                <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">

                    {/* Sort by */}
                    <div>
                        <h3 className='text-base uppercase font-medium border-b pb-1 border-slate-300 text-slate-500'>Sort by</h3>

                        <form className='text-sm flex flex-col gap-2 py-2'>
                            <div className='flex items-center gap-3'>
                                <input type="radio" name="sortBy" />
                                <label>Price - Low to High</label>
                            </div>

                            <div className='flex items-center gap-3'>
                                <input type="radio" name="sortBy" />
                                <label>Price - High to Low</label>
                            </div>
                        </form>
                    </div>

                    {/* Filter by */}
                    <div>
                        <h3 className='text-base uppercase font-medium border-b pb-1 border-slate-300 text-slate-500'>Category by</h3>

                        <form className='text-sm flex flex-col gap-2 py-2'>
                            {productCategory.map((categoryName) => (
                                <div className='flex items-center gap-3' key={categoryName.value}>
                                    <input
                                        type="checkbox"
                                        checked={selectCategory[categoryName.value]}
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

                {/* right side */}
                <div className='px-4'>
                    <p className='pl-3 font-medium text-slate-800 text-lg my-2'>Search Results: {data.length}</p>

                    <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
                        {
                            data.length !== 0 && !loading && (
                                <VerticalSearchProductCart data={data} loading={loading} />
                            )
                        }
                    </div>
                </div>

            </div>

        </div>
    );
};

export default CategoryProduct;
