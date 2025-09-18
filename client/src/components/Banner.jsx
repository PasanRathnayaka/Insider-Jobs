import React from 'react'
import { assets } from '../assets/assets'

const Banner = () => {
    return (

        <section className='my-16'>
            <div className='flex max-lg:flex-col-reverse items-center justify-center gap-15 px-4 pt-4 max-lg:pb-6 bg-gray-100 rounded-xl'>
                <div>
                    <h3 className='text-2xl font-semibold max-lg:text-center'>Download mobile app for better experience</h3>

                    <div className='flex max-lg:flex-col items-center gap-3 mt-6'>
                        <img className='cursor-pointer hover:translate-y-0.5 transition-all' src={assets.play_store} alt="" />
                        <img className='cursor-pointer hover:translate-y-0.5 transition-all' src={assets.app_store} alt="" />
                    </div>
                </div>

                <div className='hidden lg:block'>
                    <img src={assets.app_main_img} alt="" />
                </div>
            </div>
        </section>



    )
}

export default Banner