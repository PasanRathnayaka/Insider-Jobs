import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import { useMobileMenu } from '../context/MobileMenuProvider'

const MobileMenu = () => {

    const { isMobileMenuOpend, handleToggleMobileMenu } = useMobileMenu();

    useEffect(() => {
        if (isMobileMenuOpend) {
            document.body.classList.add("overflow-hidden");
        }

        return () => {
            document.body.classList.remove("overflow-hidden");
        }
    }, [isMobileMenuOpend]);



    return (
        <div className={`fixed inset-0 z-50 flex items-center backdrop-blur-sm bg-black/30 ${isMobileMenuOpend ? "block" : "hidden"}`}>
            <div className='h-screen w-1/2 md:w-1/3 flex flex-col pt-4 bg-white'>

                <div className='flex justify-end px-4'>
                    <button onClick={handleToggleMobileMenu}>
                        <img className='cursor-pointer size-3.5' src={assets.cross_icon} alt="" />
                    </button>
                </div>

                <ul className='space-y-5 px-3 py-10 '>
                    <div className='flex items-center gap-3 py-2 px-4 grow rounded cursor-pointer hover:bg-blue-50'>
                        <img src={assets.home_icon} alt="" />
                        <li>Home</li>
                    </div>

                    <div className='flex items-center gap-3 py-2 px-4 grow rounded cursor-pointer hover:bg-blue-50'>
                        <img src={assets.home_icon} alt="" />
                        <li>Home</li>
                    </div>

                    <div className='flex items-center gap-3 py-2 px-4 grow rounded cursor-pointer hover:bg-blue-50'>
                        <img src={assets.home_icon} alt="" />
                        <li>Home</li>
                    </div>

                    <div className='flex items-center gap-3 py-2 px-4 grow rounded cursor-pointer hover:bg-blue-50'>
                        <img src={assets.home_icon} alt="" />
                        <li>Home</li>
                    </div>
                </ul>
            </div>
        </div>
    )
}

export default MobileMenu