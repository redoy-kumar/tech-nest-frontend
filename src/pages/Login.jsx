import React, { useContext, useState } from 'react';
import loginIcons from '../assets/signin.gif';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import summaryApi from '../common/common';
import { toast } from 'react-toastify';
import Context from '../context/context';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataResponse = await fetch(summaryApi.signIn.url, {
            method: summaryApi.signIn.method,
            credentials: 'include', // include cookies in the request
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const dataApi = await dataResponse.json();
        if (dataApi.success) {
            toast.success(dataApi.message);
            navigate('/');
            fetchUserDetails(); // Fetch user details after successful login
            fetchUserAddToCart();
        } else {
            toast.error(dataApi.message);
        }
    }
    // console.log("data login: ", data);

    return (
        <section id='login'>
            <div className='mx-auto container p-7'>
                <div className='bg-white p-2 w-full max-w-md mx-auto rounded'>
                    <div className='w-20 h-20 mx-auto mb-4 m-5'>
                        <img className='rounded-full' src={loginIcons} alt="Login icon" />
                    </div>


                    <form action="" className='px-5 pb-5' onSubmit={handleSubmit}>
                        <div>
                            <label>Email</label>
                            <div className='mb-4 bg-slate-100'>
                                <input required type="email" onChange={handleOnChange} name='email' value={data.email} placeholder="Enter Your Email" className="border outline-none p-2 w-full rounded" />
                            </div>
                        </div>
                        <div>
                            <label>Password</label>
                            <div className='mb-4 bg-slate-100 flex items-center border p-2 rounded'>
                                <input required type={showPassword ? "text" : "password"} name='password' value={data.password} onChange={handleOnChange} id="password" placeholder="Enter Your Password" className="outline-none w-full bg-transparent" />
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

                        <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white p-2 w-full rounded-md cursor-pointer hover:scale-105 transition-all">Login</button>
                    </form>

                    <p className='my-4 mx-4'>Don't have account? <Link to={`/sign-up`} className='hover:text-orange-500 font-semibold hover:underline'>Sign Up</Link></p>
                </div>
            </div>
        </section>
    );
};

export default Login;