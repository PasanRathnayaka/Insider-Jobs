
import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { assets, jobsApplied } from '../assets/assets'
import Footer from '../components/Footer'
import MobileMenu from '../components/MobileMenu'
import { useAuth } from '../context/AuthProvider'
import { applicationAPI } from '../utils/api'


const ApplyJob = () => {

    const { token } = useAuth();

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const data  = await applicationAPI.getAppliedJobs(token);

                if (!data) return console.error("Data not recievd to applyJob page");

                console.log("Recieved data in applyJob page: ", data);

            } catch (error) {
                return console.error("Error fetching applied jobs in applJob page", error);
            }
        }

        fetchAppliedJobs();
    }, [token]);


    return (

        <>
            <Navbar />
            <MobileMenu />

            <div className='min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto mt-16'>

                <p className='text-xl'>Your Resume</p>

                <div className='flex items-center gap-4 mt-4'>
                    <button className='py-1.5 px-4 rounded bg-blue-100  text-blue-600 hover:bg-blue-200 transition-all cursor-pointer'>Resume</button>
                    <button className='py-1.5 px-4 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 cursor-pointer'>Edit</button>
                    <button 
                    className='rounded cursor-pointer'
                    >
                        <img src={assets.profile_upload_icon} alt="" />
                    </button>
                </div>

                <p className='text-xl mt-10 mb-5'>Jobs Applied</p>

                <div className='overflow-x-auto scroll-smooth'>
                    <table className='table-auto min-w-full text-md text-left'>
                        <thead>
                            <tr className='border border-gray-300'>
                                <th className='text-start p-3'>Company</th>
                                <th className='text-start p-3'>Job Title</th>
                                <th className='text-start p-3'>Location</th>
                                <th className='text-start p-3'>Date</th>
                                <th className='text-start p-3'>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {jobsApplied.map((job, index) => (
                                <tr key={index} className='border border-gray-300 text-gray-500 max-lg:space-x-5'>
                                    <td className='flex items-center gap-3 p-3'>
                                        <img className='max-lg:w-5' src={job.logo} alt="" />
                                        {job.company}
                                    </td>
                                    <td className='p-3 whitespace-nowrap'>{job.title}</td>
                                    <td className='p-3 whitespace-nowrap'>{job.location}</td>
                                    <td className='p-3 whitespace-nowrap'>{job.date}</td>
                                    <td className='p-3 whitespace-nowrap'>
                                        <div
                                            className={`flex items-center justify-center min-w-auto lg:w-1/2 px-4 py-1 rounded 
                                            ${job.status === "Pending" && " bg-blue-100 text-blue-600"}
                                            ${job.status === "Rejected" && "bg-red-100 text-red-600"}
                                            ${job.status === "Accepted" && "bg-green-100 text-green-600"}
                                            `}
                                        >
                                            {job.status}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Footer />


        </>

    )
}

export default ApplyJob