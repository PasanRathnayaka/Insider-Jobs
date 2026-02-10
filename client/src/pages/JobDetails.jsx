import Navbar from '../components/Navbar'
import { assets } from '../assets/assets'
import Footer from '../components/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import kconvert from 'k-convert';
import RelativeTime from '../components/RelativeTime';
import MobileMenu from '../components/MobileMenu';
import { useJob } from '../hooks/useJob';
import ErrorBoundary from '../components/ErrorBoundary';
import { Suspense } from 'react';
import MoreJobsError from '../components/error-handlers/MoreJobsError';
import MoreJobsSkeleton from '../components/skeletons/MoreJobsSkeleton';
import MoreJobsList from '../components/MoreJobsList';




const JobDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const { data: job } = useJob(id);



    return (
        <>
            <Navbar />
            <MobileMenu />

            <div className='min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto mt-16'>

                {/* Job Details Banner*/}
                <div className='flex max-lg:flex-col lg:items-center justify-between px-10 max-lg:px-6 py-8 max-lg:space-y-4 rounded-xl bg-sky-50 border-2 border-blue-200'>
                    <div className='flex flex-wrap md:flex-nowrap items-center gap-4'>
                        <div className='p-6 rounded-xl bg-white'>
                            <img className='w-16' src={assets.company_icon} alt="" />
                        </div>

                        <div>
                            <p className='text-2xl lg:text-3xl font-medium'>{job.title}</p>

                            <div className='flex flex-wrap md:flex-nowrap items-center gap-3 md:gap-6 mt-3'>
                                <div className='flex items-center gap-1'>
                                    <img src={assets.suitcase_icon} alt="" />
                                    <p className='text-sm text-gray-600'>{job.referenceID.username}</p>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <img src={assets.location_icon} alt="" />
                                    <p className='text-sm text-gray-600'>{job.location}</p>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <img src={assets.person_icon} alt="" />
                                    <p className='text-sm text-gray-600'>{job.level}</p>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <img src={assets.money_icon} alt="" />
                                    <p className='text-sm text-gray-600'>{kconvert.convertTo(job.salary)}</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='max-lg:flex max-md:flex-col-reverse md:items-center max-lg:justify-between gap-3'>
                        <div>
                            <button
                                onClick={() => navigate("/apply-job")}
                                className='w-full py-2 px-8 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                            >
                                Apply now
                            </button>
                        </div>
                        <div className='flex items-center md:justify-end mt-2'>
                            <p className='text-gray-400 text-sm font-semibold'>Posted: {<RelativeTime timestamp={job.createdAt} />}</p>
                        </div>
                    </div>
                </div>


                <div className='flex flex-row justify-between gap-10 lg:gap-20 max-lg:flex-col mt-8'>

                    {/* Job Description */}
                    <div className='flex flex-1 flex-col'>
                        <div className='my-3'>
                            <p className='text-xl font-semibold lg:text-2xl'>Job Description</p>

                            <p className="text-gray-500 rich-text mt-4">
                                {job.description}
                            </p>
                        </div>

                        <hr className='text-gray-200' />

                        <div className='my-3'>
                            <p className='text-xl font-semibold lg:text-2xl my-3'>Responsibilities</p>

                            <ul>
                                {job?.responsibilities?.map((item, index) => (
                                    <li key={index} className="text-gray-500 mt-4">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <hr className='text-gray-200' />

                        <div className='my-3'>
                            <p className='text-xl font-semibold lg:text-2xl my-3'>Skills Required</p>

                            <ol>
                                {job?.skills?.map((item, index) => (
                                    <li key={index} className="text-gray-500 mt-4">
                                        {item}
                                    </li>
                                ))}
                            </ol>
                        </div>

                        <hr className='text-gray-200' />

                        <div>
                            <Link to="/apply-job">
                                <button className='px-6 py-2 mt-5 text-white rounded bg-blue-600 hover:bg-blue-700 cursor-pointer'>Apply now</button>
                            </Link>
                        </div>
                    </div>


                    {/* More Jobs List */}
                    <div className='flex-col max-lg:mt-10 lg:w-1/3'>

                        <p className='text-xl font-semibold lg:text-2xl my-3'>
                            More jobs from {job.referenceID.username}
                        </p>

                        <ErrorBoundary
                            fallback={<MoreJobsError />}
                        >
                            <Suspense fallback={<MoreJobsSkeleton />}>
                                <MoreJobsList
                                    referenceId={job.referenceID._id}
                                    companyName={job.referenceID.username}
                                    currentJobId={id}
                                />
                            </Suspense>
                        </ErrorBoundary>

                    </div>
                </div>

                <Footer />
            </div>

        </>
    )
}

export default JobDetails