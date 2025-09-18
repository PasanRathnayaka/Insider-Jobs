import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import LatestJobs from '../components/LatestJobs'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import AuthModal from '../components/AuthModal'
import MobileMenu from '../components/MobileMenu'

const Home = () => {

    return (
        <>
            <Navbar />
            <MobileMenu />
            <div className='min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto mt-16'>
                <Hero />
                <LatestJobs />
                <Banner />
            </div>
            <Footer />

        </>
    )
}

export default Home