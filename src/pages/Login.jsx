import React, { useState } from 'react';
import loginIcons from '../assets/signin.gif';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <section id='login'>
            <div className='mx-auto container p-7'>
                <div className='bg-white p-2 w-full max-w-md mx-auto rounded'>
                    <div className='w-20 h-20 mx-auto mb-4 m-5'>
                        <img className='rounded-full' src={loginIcons} alt="Login icon" />
                    </div>


                    <form action="" className='px-5 pb-5'>
                        <div>
                            <label>Email</label>
                            <div className='mb-4 bg-slate-100'>
                                <input type="email" id="email" placeholder="Enter Your Email" className="border outline-none p-2 w-full rounded" /> 
                            </div>
                        </div>
                        <div>
                            <label>Password</label>
                            <div className='mb-4 bg-slate-100 flex items-center border p-2 rounded'>
                                <input type={showPassword ? "text" : "password"} id="password" placeholder="Enter Your Password" className="outline-none w-full bg-transparent" /> 
                                <div className='cursor-pointer' onClick={togglePasswordVisibility}>
                                    <span>
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>
                            <Link to={`/forgot-password`} className='block text-right text-gray-600 ml-auto hover:text-orange-500 hover:underline mb-4'>
                                Forgot password?
                            </Link>
                        </div>

                        <button type="submit" className="bg-orange-500 text-white p-2 w-full rounded-md cursor-pointer hover:scale-105 transition-all">Login</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;