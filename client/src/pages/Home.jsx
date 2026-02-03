import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import LatestJobs from '../components/LatestJobs'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import MobileMenu from '../components/MobileMenu'

const Home = () => {

    return (
        <>
            <Navbar />
            <MobileMenu />

            <div className='min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto mt-16'>
                <Hero />
                <div className='mt-10'>
                    <p className='text-2xl font-semibold'>Latest Jobs</p>
                    <p className='text-gray-500 mt-1 mb-10'>Get your desired job from top companies</p>
                    <LatestJobs />
                </div>
                <Banner />
            </div>

            <Footer />
        </>
    )
}

export default Home