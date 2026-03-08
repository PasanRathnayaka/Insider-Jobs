import { useEffect } from 'react'
import { assets } from '../assets/assets'
import { useMobileMenu } from '../context/MobileMenuProvider'
import { useAuth } from '../context/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { LayoutDashboardIcon, LogOutIcon, UserIcon, LogInIcon } from 'lucide-react'

const MobileMenu = () => {

    const { isMobileMenuOpend, handleToggleMobileMenu } = useMobileMenu();
    const { user, handleLogout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isMobileMenuOpend) {
            document.body.classList.add("overflow-hidden");
        }

        return () => {
            document.body.classList.remove("overflow-hidden");
        }
    }, [isMobileMenuOpend]);


    const handleNavigate = (path) => {
        handleToggleMobileMenu();
        navigate(path);
    };

    const handleLogoutClick = () => {
        handleToggleMobileMenu();
        handleLogout();
    };


    return (
        <div className={`fixed inset-0 z-50 flex backdrop-blur-sm bg-black/30 ${isMobileMenuOpend ? "block" : "hidden"}`}>
            <div className='h-screen w-3/4 max-w-sm flex flex-col py-4 bg-white shadow-xl overflow-y-auto animate-in slide-in-from-left duration-200'>

                <div className='flex justify-end px-4 mb-4'>
                    <button onClick={handleToggleMobileMenu} className='p-2 bg-gray-50 hover:bg-gray-100 rounded-full cursor-pointer transition-colors'>
                        <img className='cursor-pointer size-4' src={assets.cross_icon} alt="close" />
                    </button>
                </div>

                {user && (
                    <div className='px-6 mb-6 flex items-center gap-3'>
                        <img className='size-12 rounded-full border border-gray-200' src={assets.profile_img || assets.person_icon} alt="user" />
                        <div>
                            <p className='font-semibold text-gray-800'>{user?.name || "User"}</p>
                            <span className='text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded'>{user?.role}</span>
                        </div>
                    </div>
                )}

                <ul className='space-y-1 py-4 flex-1 border-t border-gray-100'>
                    <div
                        onClick={() => handleNavigate("/")}
                        className='flex items-center gap-4 py-3 px-6 cursor-pointer hover:bg-blue-50 text-gray-700 transition-colors'>
                        <img src={assets.home_icon} alt="Home" className='size-5' />
                        <li className='font-medium'>Home</li>
                    </div>

                    {!user && (
                        <div
                            onClick={() => handleNavigate("/auth")}
                            className='flex items-center gap-4 py-3 px-6 cursor-pointer hover:bg-blue-50 text-blue-600 transition-colors'>
                            <LogInIcon size={20} className='text-blue-500' />
                            <li className='font-medium'>Sign In</li>
                        </div>
                    )}

                    {user?.role === 'jobseeker' && (
                        <>
                            <div
                                onClick={() => handleNavigate("/apply-job")}
                                className='flex items-center gap-4 py-3 px-6 cursor-pointer hover:bg-blue-50 text-gray-700 transition-colors'>
                                <LayoutDashboardIcon size={20} className='text-gray-500' />
                                <li className='font-medium'>Dashboard</li>
                            </div>
                        </>
                    )}

                    {user?.role === 'recruiter' && (
                        <>
                            <div
                                onClick={() => handleNavigate("/recruiter/manage-jobs")}
                                className='flex items-center gap-4 py-3 px-6 cursor-pointer hover:bg-blue-50 text-gray-700 transition-colors'>
                                <LayoutDashboardIcon size={20} className='text-gray-500' />
                                <li className='font-medium'>Manage Jobs</li>
                            </div>
                            <div
                                onClick={() => handleNavigate("/recruiter/add-job")}
                                className='flex items-center gap-4 py-3 px-6 cursor-pointer hover:bg-blue-50 text-gray-700 transition-colors'>
                                <LayoutDashboardIcon size={20} className='text-gray-500' />
                                <li className='font-medium'>Add Jobs</li>
                            </div>
                            <div
                                onClick={() => handleNavigate("/recruiter/view-applicants")}
                                className='flex items-center gap-4 py-3 px-6 cursor-pointer hover:bg-blue-50 text-gray-700 transition-colors'>
                                <img src={assets.person_tick_icon} alt="" className='size-5' />
                                <li className='font-medium'>View Applications</li>
                            </div>
                        </>
                    )}

                    {user && (
                        <div
                            onClick={() => handleNavigate("/profile")}
                            className='flex items-center gap-4 py-3 px-6 cursor-pointer hover:bg-blue-50 text-gray-700 transition-colors'>
                            <UserIcon size={20} className='text-gray-500' />
                            <li className='font-medium'>Profile</li>
                        </div>
                    )}

                </ul>

                {user && (
                    <div className='px-6 mt-auto border-t border-gray-100 pt-4'>
                        <div
                            onClick={handleLogoutClick}
                            className='flex items-center gap-4 py-3 px-4 rounded-xl cursor-pointer bg-red-50 hover:bg-red-100 text-red-600 transition-colors'>
                            <LogOutIcon size={18} />
                            <span className='font-medium'>Logout</span>
                        </div>
                    </div>
                )}

            </div>

            {/* Click to dismiss area */}
            <div className='flex-1 cursor-pointer bg-transparent' onClick={handleToggleMobileMenu}></div>
        </div>
    )
}

export default MobileMenu