import React, { useState } from 'react'
import { assets, manageJobsData } from '../assets/assets'

const ManageJobs = () => {
    const [clickedVisibleIcon, setClickedVisibleIcon] = useState({});

    const handleClickVisibleIcon = (id) => {
        setClickedVisibleIcon(prev => (
            {
                ...prev,
                [id] : !prev[id]
            }
        ));
    }
    
    return (
        <>
            <div className='overflow-x-auto scroll-smooth'>
                <table className='table-auto min-w-full text-md text-left'>
                    <thead>
                        <tr className='border border-gray-300'>
                            <th className='text-start p-3'>#</th>
                            <th className='text-start p-3'>Job Title</th>
                            <th className='text-start p-3'>Date</th>
                            <th className='text-start p-3'>Location</th>
                            <th className='text-start p-3'>Applicants</th>
                            <th className='text-start p-3'>Visible</th>
                        </tr>
                    </thead>

                    <tbody>
                        {manageJobsData.map((job, index) => (
                            <tr key={index} className='border border-gray-300 text-gray-500 max-lg:space-x-5'>
                                <td className='flex items-center gap-3 p-3'>{job._id}</td>
                                <td className='p-3 whitespace-nowrap'>{job.title}</td>
                                <td className='p-3 whitespace-nowrap'>{new Date(job.date).toLocaleDateString()}</td>
                                <td className='p-3 whitespace-nowrap'>{job.location}</td>
                                <td className='p-3 whitespace-nowrap'>{job.applicants}</td>
                                <td className='p-3 whitespace-nowrap'>
                                    <div className='pl-5'>
                                        <img className='size-5 cursor-pointer' src={`${clickedVisibleIcon[job._id] ? assets.tick_icon_fill : assets.tick_icon}`} onClick={() => {handleClickVisibleIcon(job._id)}} />
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

export default ManageJobs