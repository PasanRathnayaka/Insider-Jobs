import Navbar from '../components/Navbar'
import { assets } from '../assets/assets'
import Footer from '../components/Footer'
import MobileMenu from '../components/MobileMenu'
import { useLocation } from 'react-router-dom'
import ErrorBoundary from '../components/ErrorBoundary'
import AppliedJobsError from '../components/error-handlers/jobseeker/AppliedJobsError'
import { Suspense } from 'react'
import AppliedJobsTableSkeleton from '../components/skeletons/jobseeker/AppliedJobsTableSkeleton'
import AppliedJobsTable from '../components/jobseeker/AppliedJobsTable'



const ApplyJob = () => {

    const location = useLocation();


    return (
        <>
            <Navbar navigateLocation={location.pathname} />
            <MobileMenu />

            <div className='min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto mt-16'>

                <p className='text-xl'>Your Resume</p>

                <div className='flex items-center gap-4 mt-4'>
                    <button className='py-1.5 px-4 rounded bg-blue-100  text-blue-600 hover:bg-blue-200 transition-all cursor-pointer'>Resume</button>
                    <button className='py-1.5 px-4 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 cursor-pointer'>Edit</button>
                    <button
                        className='rounded cursor-pointer'
                    >
                        <img src={assets.profile_upload_icon} alt="" />
                    </button>
                </div>

                <p className='text-xl mt-10 mb-5'>Jobs Applied</p>

                <ErrorBoundary fallback={<AppliedJobsError />} >
                    <Suspense fallback={<AppliedJobsTableSkeleton />}>
                        <AppliedJobsTable />
                    </Suspense>
                </ErrorBoundary>
            </div>

            <Footer />

        </>
    )
}

export default ApplyJob