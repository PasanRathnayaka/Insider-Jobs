import { useEffect, useRef, useState } from 'react'
import { assets } from '../assets/assets'
import { useAuth } from '../context/AuthProvider'
import { Link, useNavigate } from 'react-router-dom';
import { useMobileMenu } from '../context/MobileMenuProvider';



const Navbar = () => {

    const { user, handleLogout } = useAuth();
    const { handleToggleMobileMenu } = useMobileMenu();
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const profileMenuListRef = useRef(null);
    const recuiterLoginBtnRef = useRef(null);
    const navigate = useNavigate();


    useEffect(() => {

        const triggerOutsideCliks = (e) => {
            if (profileMenuListRef.current && !profileMenuListRef.current.contains(e.target)) {
                setIsProfileMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", triggerOutsideCliks);

        return () => {
            document.removeEventListener("mousedown", triggerOutsideCliks);
        }
    }, []);



    return (

        <nav className="fixed top-0 w-full bg-white shadow">
            <div className='flex items-center justify-between px-4 md:px-16 py-3'>
                <div className='flex items-center max-md:gap-8'>
                    <button onClick={handleToggleMobileMenu}>
                        <img className='size-5 block md:hidden cursor-pointer' src={assets.nav_menu_icon_no_fill} />
                    </button>

                    <Link to="/">
                        <div>
                            <img
                                className='cursor-pointer'
                                src={assets.logo}
                                alt="company-logo"
                            />
                        </div>
                    </Link>
                </div>


                <div className='hidden md:flex items-center gap-3'>

                    {!user &&
                        <>
                            <button
                                className='text-gray-500 cursor-pointer hover:text-gray-700'
                                ref={recuiterLoginBtnRef}
                            >
                                Recruiter Login
                            </button>
                            <button
                                className='px-6 py-2 bg-blue-600 text-white rounded-3xl hover:bg-blue-700 cursor-pointer'
                                onClick={() => navigate("/auth")}
                            >
                                Sign In
                            </button>
                        </>
                    }

                    {user &&
                        <div className='size-9 bg-amber-400 rounded-full static'>
                            <button onClick={() => setIsProfileMenuOpen(true)}>
                                <img className='size-9 rounded-full object-cover cursor-pointer border-0' src={assets.profile_img} alt="" />
                            </button>
                        </div>
                    }

                    {isProfileMenuOpen &&
                        <div className='absolute top-4/5 right-16 p-2 w-25 rounded bg-white shadow-lg' ref={profileMenuListRef}>
                            <button
                                className='py-1 px-4 w-full rounded cursor-pointer hover:bg-gray-200'
                                onClick={() => navigate("/profile")}
                            >
                                Profile
                            </button>
                            <button
                                className='py-1 px-4 w-full rounded cursor-pointer hover:bg-gray-200'
                                onClick={() => {
                                    handleLogout();
                                    setIsProfileMenuOpen(false);
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    }

                </div>

            </div>
        </nav>

    )
}

export default Navbar