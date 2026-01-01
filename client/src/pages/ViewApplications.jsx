import React, { useEffect, useState } from 'react'
import { assets, viewApplicationsPageData } from '../assets/assets'
import { useAuth } from '../context/AuthProvider';
import { applicationAPI } from '../utils/api';

const ViewApplications = () => {

    const [isActionSelected, setIsActionSelected] = useState({});
    const {token} = useAuth();

    const handleActionSelector = (key) => {
        if (key) {
            setIsActionSelected(prev => (
                {
                    [key]: !prev[key]
                }
            ));
        }
    }

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const {data} = await applicationAPI.getApplicants(token);

                if(!data) return console.error("No data received to viewApplications page");

                console.log("Data received to view applications page: ", data);

            } catch (error) {
                return console.error("Error in fetching applicants in view applications page", error);
            }
        }

        fetchApplicants();
    }, [token])


    return (
        <>
            <div className='overflow-x-auto scroll-smooth'>
                <table className='table-auto min-w-full max-md:text-sm text-left'>
                    <thead>
                        <tr className='border border-gray-300'>
                            <th className='text-start p-3'>#</th>
                            <th className='text-start p-3'>User Name</th>
                            <th className='text-start p-3'>Job Title</th>
                            <th className='text-start p-3'>Location</th>
                            <th className='text-start p-3'>Resume</th>
                            <th className='text-start p-3'>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {viewApplicationsPageData.map((data, index) => (
                            <tr key={index} className='border border-gray-300 text-gray-500 max-lg:space-x-5'>

                                <td className='p-3 whitespace-nowrap'>{data._id}</td>
                                <td className='p-3 whitespace-nowrap'>
                                    <div className='flex items-center gap-3'>
                                        <img className='size-8' src={data.imgSrc} alt="profile-img" />
                                        <p>{data.name}</p>
                                    </div>
                                </td>
                                <td className='p-3 whitespace-nowrap'>{data.jobTitle}</td>
                                <td className='p-3 whitespace-nowrap'>{data.location}</td>
                                <td className='p-3 whitespace-nowrap'>
                                    <button className='cursor-pointer'>
                                        <div className='flex items-center gap-3 py-1.5 px-4 bg-blue-50 rounded hover:bg-blue-100'>
                                            <p className='text-blue-500 hidden md:block'>Resume</p>
                                            <img className='size-4' src={assets.resume_download_icon} alt="" />
                                        </div>
                                    </button>
                                </td>
                                <td className='p-3 whitespace-nowrap static'>
                                    <button className='flex items-center ml-3' id='action-btn' onClick={() => { handleActionSelector(data._id) }}>
                                        <img className='size-5 cursor-pointer' src={assets.three_dot_icon} alt="" />
                                    </button>


                                    <div className={`absolute flex flex-col py-2 px-2 bg-white shadow rounded-md space-y-2 ${isActionSelected[data._id] ? "block" : "hidden"}`}>
                                        <button className='cursor-pointer py-1 px-4 rounded bg-sky-50 text-blue-500 hover:bg-blue-100' id='accept-btn' onClick={() => { handleActionSelector(data._id); alert("Accepted") }}>Accept</button>
                                        <button className='cursor-pointer py-1 px-4 rounded bg-orange-50 text-orange-500 hover:bg-orange-100' id='reject-btn'  onClick={() => { handleActionSelector(data._id); alert("Rejected") }}>Reject</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ViewApplications