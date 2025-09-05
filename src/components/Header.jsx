import React from 'react';
import { LuSearch } from "react-icons/lu";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";

const Header = () => {
    return (
        <header className='h-16 shadow-md'>
            <div className='mx-auto container h-full flex items-center justify-between px-8'>
                {/* Logo */}
                <div className='cursor-pointer flex items-center gap-1'>
                    <img width={40} height={25} className='object-contain rounded-full' src="src/assets/only-logo.png" alt="Logo" />
                    <span className='text-2xl lg:text-3xl font-semibold'>TechNest.</span>
                </div>

                {/* Search Bar */}
                <div className='hidden lg:flex items-center w-full justify-between max-w-sm'>
                    <input type="text" placeholder="Search product here..." className="border w-full outline-none focus-within:shadow-md border-gray-300 rounded-l-full px-4 py-2" />
                   <div className='text-lg min-w-[50px] py-3 cursor-pointer flex items-center justify-center bg-orange-500 text-white rounded-r-full'>
                     <LuSearch />
                   </div>
                </div>

                {/* User Icons  and Cards*/}
                <div className='flex items-center gap-7'>
                    {/* user icons */}
                    <div className='text-3xl cursor-pointer'>
                         <FaRegCircleUser />
                    </div>

                    {/* Shopping Cart */}
                    <div className='text-2xl cursor-pointer relative'>
                       <span> <FaShoppingCart /></span>
                       <div className='absolute -top-2 -right-3 w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center text-[10px]'>
                        <p className='text-xs'>0</p>
                       </div>
                    </div>

                    {/* login and logout button */}
                    <div>
                        <button className='px-3 bg-orange-500 text-white rounded-full py-1 hover:bg-orange-700'>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;