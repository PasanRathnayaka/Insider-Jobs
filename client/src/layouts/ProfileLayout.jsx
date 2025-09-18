import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const ProfileLayout = () => {

    const [selectedOption, setSelectedOption] = useState("myProfile");
    const navigate = useNavigate();


    return (
        <>
            {/* Top Navbar */}
            <nav className='fixed w-full top-0 z-50 px-16 py-6 shadow'>
                <div className='flex items-center justify-between'>
                    <div>
                        <img src={assets.logo} alt="" />
                    </div>
                    <div className='flex items-center gap-4'>
                        <div>
                            <img className='size-8' src={assets.profile_img} alt="" />
                        </div>
                    </div>
                </div>
            </nav>

            <div className='min-h-screen conatiner flex mt-20 fixed z-0 gap-10'>

                {/* Sidebar */}
                <div className='flex flex-col w-3xs shadow pt-10'>
                    <ul className='space-y-3'>
                        <li className={`relative flex items-center gap-4 flex-1 px-5 py-3 ${selectedOption === "myProfile" && "bg-blue-50"} cursor-pointer`} onClick={() => { setSelectedOption("myProfile"); navigate("/profile/my-profile"); }}>
                            <img
                                className='size-5'
                                src={assets.person_icon}
                                alt=""
                            />
                            My Profile

                            {selectedOption === "myProfile" && (
                                <div className='absolute right-0 h-full w-1.5 bg-blue-500'></div>
                            )}
                        </li>


                        <li className={`relative flex items-center gap-4 flex-1 px-5 py-3 ${selectedOption === "security" && "bg-blue-50"} cursor-pointer`} onClick={() => { setSelectedOption("security"); navigate("/profile/profile-security"); }}>
                            <img
                                className='size-5'
                                src={assets.lock_icon}
                                alt=""
                            />
                            Security

                            {selectedOption === "security" && (
                                <div className='absolute right-0 h-full w-1.5 bg-blue-500'></div>
                            )}
                        </li>
                    </ul>
                </div>

                {/* Pages */}
                <div className='flex flex-col w-3xl pt-10'>
                    <Outlet />
                </div>

            </div>

        </>
    )
}

export default ProfileLayout