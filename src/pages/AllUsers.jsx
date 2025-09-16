import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import summaryApi from '../common/common';
import { toast } from 'react-toastify';
import moment from 'moment'
import { MdOutlineEdit } from "react-icons/md";
import ChangeUserRole from '../components/changeUserRole';

const AllUsers = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [openUpdateRole, setOpenUpdateRole] = useState(false)
    const [updateUserDetails, setupdateUserDetails] = useState({
        email: "",
        name: "",
        role: "",
        _id: ""
    })

    const fetchAllUsers = async () => {
        const fetchData = await fetch(summaryApi.allUser.url, {
            method: summaryApi.allUser.method,
            credentials: 'include'
        })

        const dataResponse = await fetchData.json();

        if (dataResponse.success) {
            setAllUsers(dataResponse.data)
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message);
        }
    }

    useEffect(() => {
        fetchAllUsers();
    }, [])

    return (
        <div>
            <table className='w-full bg-white'>
                <thead>
                    <tr className='bg-black text-white'>
                        <th className='border text-base font-medium'>Serial No.</th>
                        <th className='border text-base font-medium'>Name</th>
                        <th className='border text-base font-medium'>Email</th>
                        <th className='border text-base font-medium'>Role</th>
                        <th className='border text-base font-medium'>Created Date</th>
                        <th className='border text-base font-medium'>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        allUsers.map((el, index) => {
                            return (
                                <tr key={el._id || index}>
                                    <td className='pb-4 border text-base text-center'>{index + 1}</td>
                                    <td className='pb-4 border text-base text-center'>{el?.name}</td>
                                    <td className='pb-4 border text-base text-center'>{el?.email}</td>
                                    <td className='pb-4 border text-base text-center'>{el?.role}</td>
                                    <td className='pb-4 border text-base text-center'>{moment(el?.createdAt).format('ll')}</td>
                                    <td className='border text-base text-center'>
                                       
                                        {/* Edit Button */}
                                        <button className='bg-green-200 p-2 px-4 rounded-md hover:text-white hover:bg-green-500'
                                            onClick={() => {
                                                setupdateUserDetails(el);
                                                setOpenUpdateRole(true);
                                            }}
                                        >
                                            <MdOutlineEdit />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            {/* Change Role */}
            {
                openUpdateRole && (
                    <ChangeUserRole onClose={() => setOpenUpdateRole(false)}
                        name={updateUserDetails.name}
                        email={updateUserDetails.email}
                        role={updateUserDetails.role}
                        userId={updateUserDetails._id}
                        callFunction={fetchAllUsers}
                    />
                )
            }

        </div>
    );
};

export default AllUsers;