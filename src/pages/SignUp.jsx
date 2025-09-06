import React, { useState } from 'react';
import loginIcons from '../assets/signin.gif';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import imageToBase64 from '../helpers/imageToBase64';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        confirmPassword: "",
        profilePic: ""
    });

    const handleUploadPic = async(e) =>{
        const file = e.target.files[0];
        const image = await imageToBase64(file);

        setData((preve)=>{
            return{
                ...preve,
                profilePic: image
            }
        })
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <section id='signup'>
            <div className='mx-auto container p-7'>
                <div className='bg-white p-2 w-full max-w-md mx-auto rounded'>
                    <div className='w-24 h-24 mx-auto rounded-full mb-4 m-5 relative overflow-hidden'>
                        <div>
                            <img src={data.profilePic || loginIcons} alt="Login icon" />
                        </div>
                        <form>
                            <label>
                                <input type="file" hidden onChange={handleUploadPic} />
                                <div className='w-full cursor-pointer text-xs absolute bottom-1 bg-slate-200/70 pt-1 pb-2 text-center'>
                                    Upload Photo
                                </div>
                            </label>
                        </form>
                    </div>


                    <form action="" className='px-5 pb-5' onSubmit={handleSubmit}>

                        {/* Name Field */}
                        <div>
                            <label>Name: </label>
                            <div className='mb-4 bg-slate-100'>
                                <input type="text" onChange={handleOnChange} name='name' required value={data.name} placeholder="Enter Your Name" className="border outline-none p-2 w-full rounded" />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div>
                            <label>Email:</label>
                            <div className='mb-4 bg-slate-100'>
                                <input type="email" onChange={handleOnChange} required name='email' value={data.email} placeholder="Enter Your Email" className="border outline-none p-2 w-full rounded" />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label>Password:</label>
                            <div className='mb-4 bg-slate-100 flex items-center border p-2 rounded'>
                                <input required type={showPassword ? "text" : "password"} name='password' value={data.password} onChange={handleOnChange} id="password" placeholder="Enter Your Password" className="outline-none w-full bg-transparent" />
                                <div className='cursor-pointer' onClick={() => setShowPassword((preve) => !preve)}>
                                    <span>
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>

                        </div>

                        {/* Confirm Password*/}
                        <div>
                            <label>Confirm Password:</label>
                            <div className='mb-4 bg-slate-100 flex items-center border p-2 rounded'>
                                <input required type={showConfirmPassword ? "text" : "password"} name='confirmPassword' value={data.confirmPassword} onChange={handleOnChange} id="confirmPassword" placeholder="Enter Your Confirm Password" className="outline-none w-full bg-transparent" />
                                <div className='cursor-pointer' onClick={() => setShowConfirmPassword((preve) => !preve)}>
                                    <span>
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>

                        </div>

                        <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white p-2 w-full rounded-md cursor-pointer hover:scale-105 transition-all">Sign Up</button>
                    </form>

                    <p className='my-4 mx-4'>Already have account? <Link to={`/login`} className='hover:text-orange-500 font-semibold hover:underline'>Login</Link></p>
                </div>
            </div>
        </section>
    );
};

export default SignUp;