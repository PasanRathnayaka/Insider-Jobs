import { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { assets } from '../assets/assets';


const RecruiterLayout = () => {

    const location = useLocation();

    const registeredRoutes = {
        addJob: ["/recruiter", "/recruiter/add-job"],
        manageJobs: ["/recruiter/manage-jobs"],
        viewApplications: ["/recruiter/view-applications"]
    };



    return (

        <>
            <Navbar />

            <div className='min-h-screen flex container mt-16'>

                {/* Col-1 */}
                <div className='py-8 flex flex-col w-52 space-y-2 max-lg:hidden border-r-2 border-r-gray-300 min-h-screen fixed'>
                    <Link to="/recruiter/manage-jobs">
                        <button
                            className={`flex items-center w-full gap-3 py-3 pl-8 pr-8 cursor-pointer hover:bg-sky-50 relative 
                                        ${registeredRoutes.manageJobs.includes(location.pathname) && "bg-blue-50"}`}
                        >
                            <img src={assets.home_icon} alt="" />
                            <p className='whitespace-nowrap'>Manage Jobs</p>

                            {registeredRoutes.manageJobs.includes(location.pathname) && (
                                <div className='absolute right-0 h-full w-1.5 bg-blue-500'></div>
                            )}
                        </button>
                    </Link>

                    <Link to="/recruiter/add-job">
                        <button
                            className={`flex items-center w-full gap-3 py-3 pl-8 pr-8 cursor-pointer hover:bg-sky-50 relative 
                                        ${registeredRoutes.addJob.includes(location.pathname) && "bg-blue-50"}`}
                        >
                            <img src={assets.home_icon} alt="" />
                            <p className='whitespace-nowrap'>Add Jobs</p>

                            {registeredRoutes.addJob.includes(location.pathname) && (
                                <div className='absolute right-0 h-full w-1.5 bg-blue-500'></div>
                            )}
                        </button>
                    </Link>

                    <Link to="/recruiter/view-applications">
                        <button
                            className={`flex items-center w-full gap-3 py-3 pl-8 pr-8 cursor-pointer hover:bg-sky-50 relative 
                                        ${registeredRoutes.viewApplications.includes(location.pathname) && "bg-blue-50"}`}
                        >
                            <img src={assets.person_tick_icon} alt="" />
                            <p className='whitespace-nowrap'>View Applications</p>

                            {registeredRoutes.viewApplications.includes(location.pathname) && (
                                <div className='absolute right-0 h-full w-1.5 bg-blue-500'></div>
                            )}
                        </button>
                    </Link>

                </div>


                {/* Col-2 */}
                {/* Content Screen */}
                <div className='ml-52 pt-10 lg:px-8 w-full max-lg:flex max-lg:justify-center'>
                    <Outlet />
                </div>

            </div>
        </>

    )
}

export default RecruiterLayout