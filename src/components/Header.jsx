import React, { useState, useEffect, useRef } from 'react';
import { LuSearch } from "react-icons/lu";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import summaryApi from '../common/common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import logo from '../assets/only-logo.PNG';
import ROLE from '../common/role';

const Header = () => {
    const user = useSelector(state => state?.user?.user);

    const [menuDisplay, setMenuDisplay] = useState(false);
    const dispatch = useDispatch();

    const menuRef = useRef();

    // Close menu when clicking outside
    useEffect(() => {
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuDisplay(false);
            }
        };
        document.addEventListener("click", handler);
        return () => document.removeEventListener("click", handler);
    }, []);

    const handleLogout = async () => {
        const fetchData = await fetch(summaryApi.logoutUser.url, {
            method: summaryApi.logoutUser.method,
            credentials: 'include'
        });

        const data = await fetchData.json();

        if (data.success) {
            toast.success(data.message);
            dispatch(setUserDetails(null));
        }

        if (data.error) {
            toast.error(data.message);
        }
    };

    return (
        <header className='h-16 shadow-md'>
            <div className='mx-auto container h-full flex items-center justify-between px-8'>
                {/* Logo */}
                <div className='cursor-pointer flex items-center gap-1'>
                    <img
                        width={40}
                        height={25}
                        className="object-contain rounded-full"
                        src={logo}
                        alt="Logo"
                    />
                    <span className='text-2xl lg:text-3xl font-semibold'>TechNest.</span>
                </div>

                {/* Search Bar */}
                <div className='hidden lg:flex items-center w-full justify-between max-w-sm'>
                    <input
                        type="text"
                        placeholder="Search product here..."
                        className="border w-full outline-none focus-within:shadow-md border-gray-300 rounded-l-full px-4 py-2"
                    />
                    <div className='text-lg min-w-[50px] py-3 cursor-pointer flex items-center justify-center bg-orange-500 text-white rounded-r-full'>
                        <LuSearch />
                    </div>
                </div>

                {/* User Icons and Cart */}
                <div className='flex items-center gap-7'>

                    {/* User Menu */}
                    <div className='relative flex justify-center' ref={menuRef}>
                        {
                            user?._id && (
                                <div
                                    className='text-3xl cursor-pointer relative flex justify-center'
                                    onClick={() => setMenuDisplay(prev => !prev)}
                                >
                                    {user?.profilePic ? (
                                        <img src={user?.profilePic} alt={user?.name} className='w-10 h-10 rounded-full' />
                                    ) : (
                                        <FaRegCircleUser />
                                    )}
                                </div>
                            )
                        }

                        {menuDisplay && user?.role === ROLE.ADMIN && (
                            <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded hidden md:block'>
                                <nav className='flex flex-col'>
                                    <Link
                                        to={"admin-panel"}
                                        className='whitespace-nowrap hover:bg-slate-100 p-2'
                                        onClick={() => setMenuDisplay(false)}
                                    >
                                        Admin Panel
                                    </Link>
                                </nav>
                            </div>
                        )}
                    </div> {/* ✅ closed properly */}

                    {/* Shopping Cart */}
                    <div className='text-2xl cursor-pointer relative'>
                        <span><FaShoppingCart /></span>
                        <div className='absolute -top-2 -right-3 w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center text-[10px]'>
                            <p className='text-xs'>0</p>
                        </div>
                    </div>

                    {/* Login and Logout button */}
                    <div>
                        {user?._id ? (
                            <button
                                onClick={handleLogout}
                                className='px-3 bg-orange-500 text-white rounded-full py-1 hover:bg-orange-700'
                            >
                                Logout
                            </button>
                        ) : (
                            <button className='px-3 bg-orange-500 text-white rounded-full py-1 hover:bg-orange-700'>
                                <Link to={`/login`}>
                                    Login
                                </Link>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
