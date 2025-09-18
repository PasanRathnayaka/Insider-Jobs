import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { assets } from '../assets/assets'
import AddJob from '../pages/AddJob'
import { Link, Outlet } from 'react-router-dom'


const RecruiterLayout = () => {

    /*const [state, setState] = useState(
        {
            isManageJobsClicked: false,
            isAddJobClicked: false,
            isViewApplicationClicked: false,
        }
    )*/

    const [clickedOptions, setClickedOptions] = useState({});

    const toggleOptions = (key) => {
        setClickedOptions(
            {
                [key]: key
            }
        );
    }

    

    {/*const manageJobsRef = useRef(null);
    const addJobRef = useRef(null);
    const viewApplicationsRef = useRef(null);*/}

    /*const triggerOption = (e) => {
        if (e && manageJobsRef || addJobRef || viewApplicationsRef) {
            if (manageJobsRef.current.contains(e.target)) {
                setState({ isManageJobsClicked: true });
            }
            else if (addJobRef.current.contains(e.target)) {
                setState({ isAddJobClicked: true });
            } else {
                setState({ isViewApplicationClicked: true });
            }
        }
    }*/



    return (

        <>
            <Navbar />

            <div className='min-h-screen flex container mt-16 md:fixed'>

                {/* Col-1 */}
                <div className='py-8 flex flex-col w-auto space-y-2 max-lg:hidden border-r-2 border-r-gray-300 min-h-screen'>
                    <Link to="/recruiter/manage-jobs">
                        <div className={`flex items-center gap-3 py-3 pl-8 pr-8 cursor-pointer hover:bg-sky-50 relative ${clickedOptions["manage_jobs"] && "bg-blue-50"}`} onClick={() => {toggleOptions("manage_jobs")}}>
                            <img src={assets.home_icon} alt="" />
                            <p className='whitespace-nowrap'>Manage Jobs</p>
                            {clickedOptions["manage_jobs"] && (
                                <div className='absolute right-0 h-full w-1.5 bg-blue-500'></div>
                            )}
                        </div>

                    </Link>

                    <Link to="/recruiter/add-job">
                        <div className={`flex items-center gap-3 py-3 pl-8 pr-8 cursor-pointer hover:bg-sky-50 relative ${clickedOptions["add_job"] && "bg-blue-50"}`} onClick={() => {toggleOptions("add_job")}}>
                            <img src={assets.add_icon} alt="" />
                            <p className='whitespace-nowrap'>Add Job</p>
                            {clickedOptions["add_job"] && (
                                <div className='absolute right-0 h-full w-1.5 bg-blue-500'></div>
                            )}
                        </div>
                    </Link>

                    <Link to="/recruiter/view-applications">
                        <div className={`flex items-center gap-3 py-3 pl-8 pr-8 cursor-pointer hover:bg-sky-50 relative ${clickedOptions["view_applications"] && "bg-blue-50"}`} onClick={() => {toggleOptions("view_applications")}}>
                            <img src={assets.person_tick_icon} alt="" />
                            <p className='whitespace-nowrap'>View Applications</p>
                            {clickedOptions["view_applications"] && (
                                <div className='absolute right-0 h-full w-1.5 bg-blue-500'></div>
                            )}
                        </div>
                    </Link>

                </div>


                {/* Col-2 */}
                {/* Content Screen */}
                <div className='pt-10 lg:px-8 w-full max-lg:flex max-lg:justify-center'>
                    <Outlet />
                </div>

            </div>
        </>

    )
}

export default RecruiterLayout