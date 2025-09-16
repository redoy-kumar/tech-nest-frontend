import React, { useState } from 'react';
import ROLE from '../common/role'
import { IoCloseSharp } from "react-icons/io5";
import summaryApi from '../common/common';
import {toast} from 'react-toastify';

const ChangeUserRole = ({name,email,role,userId,onClose,callFunction}) => {
    const [userRole, setUserRole] = useState(role);


    const updateUserRole = async() =>{
        const fetchResponse = await fetch(summaryApi.updateUser.url,{
            method: summaryApi.updateUser.method,
            credentials: 'include',
            headers: {
                'content-type' : 'application/json'
            },
            body : JSON.stringify({
                userId: userId,
                role: userRole
            })
        })

        const responseData = await fetchResponse.json()

        if(responseData.success){
            toast.success(responseData.message)
            onClose()
            callFunction()
        }

    }

    const handleOnChangeSelect = (e) =>{
        setUserRole(e.target.value)
        console.log(e.target.value);
    }

    return (
        <div className='w-full h-full z-10 fixed left-0 right-0 bottom-0 justify-between items-center flex backdrop-blur-xs'>
            <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>
                
                <button className='block ml-auto cursor-pointer' onClick={onClose}>
                    <IoCloseSharp />
                </button>
                
                <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>
                <p>Name: {name}</p>
                <p>Email: {email}</p>
                <div className='flex items-center justify-between my-4'>
                    <p>Role:</p>
                    <select className='border px-4 py-1 cursor-pointer' value={userRole} onChange={handleOnChangeSelect}>
                        {
                            Object.values(ROLE).map(el => {
                                return (
                                    <option value={el} key={el}>{el}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <button  className='w-fit mx-auto block py-1 px-3 cursor-pointer rounded-full bg-orange-500 text-white hover:bg-orange-600' onClick={updateUserRole}>Change Role</button>
            </div>
        </div>
    );
};

export default ChangeUserRole;