import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <section className='px-2 md:px-4 lg:px-16 py-3'>
      <div className='flex max-lg:flex-col-reverse space-y-4 items-center justify-between p-3 mt-8'>
        <div className='flex max-md:flex-col items-center gap-1 md:gap-4'>
            <img className='w-26' src={assets.logo} alt="" />
            <p className='text-gray-500 max-md:hidden'>|</p>
            <p className='text-sm text-gray-500'>All right reserved. Copyright @Insider Jobs</p>
        </div>

        <div className='flex items-center gap-3 mb-3'>
           <img className='hover:-translate-y-0.5 transition-all cursor-pointer' src={assets.facebook_icon} alt="facebook-icon" />
           <img className='hover:-translate-y-0.5 transition-all cursor-pointer' src={assets.twitter_icon} alt="twitter-icon" />
           <img className='hover:-translate-y-0.5 transition-all cursor-pointer' src={assets.instagram_icon} alt="instagram-icon" />
        </div>
      </div>
    </section>
  )
}

export default Footer