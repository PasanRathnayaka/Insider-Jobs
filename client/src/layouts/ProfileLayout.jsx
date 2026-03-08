import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useMobileMenu } from '../context/MobileMenuProvider'
import MobileMenu from '../components/MobileMenu';

const ProfileLayout = () => {

    const [selectedOption, setSelectedOption] = useState("myProfile");
    const navigate = useNavigate();
    const { handleToggleMobileMenu } = useMobileMenu();

    return (
        <div className='bg-gray-50/30 min-h-screen'>
            <MobileMenu />

            {/* Top Navbar */}
            <nav className='fixed w-full top-0 z-40 px-4 md:px-16 py-4 md:py-5 shadow-sm bg-white border-b border-gray-100'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                        <button onClick={handleToggleMobileMenu} className='p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors md:hidden'>
                            <img className='size-5 cursor-pointer opacity-70' src={assets.nav_menu_icon_no_fill} alt="menu" />
                        </button>
                        <div className='hidden md:block'>
                            <img src={assets.logo} alt="brand-logo" className='cursor-pointer' onClick={() => navigate("/")} />
                        </div>
                    </div>

                    <div className='flex items-center gap-4'>
                        <button onClick={() => navigate("/profile")} className='rounded-full overflow-hidden hover:ring-2 hover:ring-blue-100 transition-all cursor-pointer'>
                            <img className='size-9 object-cover' src={assets.profile_img || assets.person_icon} alt="user" />
                        </button>
                    </div>
                </div>
            </nav>

            <div className='container mx-auto flex flex-col md:flex-row mt-[72px] md:mt-24 px-4 md:px-8 xl:px-16 gap-6 md:gap-8 pb-10'>

                {/* Sidebar (Tablet/Desktop) */}
                <div className='hidden md:flex flex-col w-64 shadow-sm border border-gray-100 rounded-xl py-6 bg-white shrink-0 h-fit sticky top-[120px]'>
                    <ul className='space-y-1 px-3'>
                        <li>
                            <button className={`flex items-center gap-3.5 w-full px-4 py-3 rounded-lg cursor-pointer transition-colors ${selectedOption === "myProfile" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}
                                onClick={() => {
                                    setSelectedOption("myProfile");
                                    navigate("/profile/my-profile");
                                }}
                            >
                                <img className={`size-5 ${selectedOption === "myProfile" ? 'opacity-100' : 'opacity-60'}`} src={assets.person_icon} alt="profile" />
                                <span className='font-medium'>My Profile</span>
                            </button>
                        </li>

                        <li>
                            <button className={`flex items-center gap-3.5 w-full px-4 py-3 rounded-lg cursor-pointer transition-colors ${selectedOption === "security" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}
                                onClick={() => {
                                    setSelectedOption("security");
                                    navigate("/profile/profile-security");
                                }}>
                                <img className={`size-5 ${selectedOption === "security" ? 'opacity-100' : 'opacity-60'}`} src={assets.lock_icon} alt="security" />
                                <span className='font-medium'>Security</span>
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Mobile Navigation Tabs (visible only on small screens) */}
                <div className='md:hidden flex bg-white rounded-xl shadow-sm border border-gray-100 p-1.5 mt-4'>
                    <button
                        className={`flex-1 flex justify-center items-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${selectedOption === 'myProfile' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:bg-gray-50'}`}
                        onClick={() => {
                            setSelectedOption("myProfile");
                            navigate("/profile/my-profile");
                        }}
                    >
                        <img className={`size-4 ${selectedOption === "myProfile" ? 'opacity-100' : 'opacity-60'}`} src={assets.person_icon} alt="profile" />
                        Profile
                    </button>
                    <button
                        className={`flex-1 flex justify-center items-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${selectedOption === 'security' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:bg-gray-50'}`}
                        onClick={() => {
                            setSelectedOption("security");
                            navigate("/profile/profile-security");
                        }}
                    >
                        <img className={`size-4 ${selectedOption === "security" ? 'opacity-100' : 'opacity-60'}`} src={assets.lock_icon} alt="security" />
                        Security
                    </button>
                </div>

                {/* Pages Content Area */}
                <div className='flex-1 w-full md:mt-0 pt-2 md:pt-4'>
                    <Outlet />
                </div>

            </div>
        </div>
    )
}

export default ProfileLayout