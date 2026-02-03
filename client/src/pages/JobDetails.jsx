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
import { useQueryClient } from '@tanstack/react-query';




const JobDetails = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const { data } = useJob(id);

    const queryClient = useQueryClient();

    const hadleRetry = () => {
        queryClient.invalidateQueries(["more-jobs", data.job.referenceID._id]);
    };



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
                            <p className='text-2xl lg:text-3xl font-medium'>{data.job.title}</p>

                            <div className='flex flex-wrap md:flex-nowrap items-center gap-3 md:gap-6 mt-3'>
                                <div className='flex items-center gap-1'>
                                    <img src={assets.suitcase_icon} alt="" />
                                    <p className='text-sm text-gray-600'>{data.job.referenceID.username}</p>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <img src={assets.location_icon} alt="" />
                                    <p className='text-sm text-gray-600'>{data.job.location}</p>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <img src={assets.person_icon} alt="" />
                                    <p className='text-sm text-gray-600'>{data.job.level}</p>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <img src={assets.money_icon} alt="" />
                                    <p className='text-sm text-gray-600'>{kconvert.convertTo(data.job.salary)}</p>
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
                            <p className='text-gray-400 text-sm font-semibold'>Posted: {<RelativeTime timestamp={data.job.createdAt} />}</p>
                        </div>
                    </div>
                </div>


                <div className='flex flex-row justify-between gap-10 lg:gap-20 max-lg:flex-col mt-8'>

                    {/* Job Description */}
                    <div className='flex flex-1 flex-col'>
                        <p className='text-xl font-semibold lg:text-2xl my-3'>Job Description</p>

                        <p className="text-gray-500 rich-text mt-4">
                            {data.job.description}
                        </p>

                        <div>
                            <Link to="/apply-job">
                                <button className='px-6 py-2 mt-5 ml-2 text-white rounded bg-blue-600 hover:bg-blue-700 cursor-pointer'>Apply now</button>
                            </Link>
                        </div>
                    </div>


                    {/* More Jobs List */}
                    <div className='flex-col max-lg:mt-10 lg:w-1/3'>

                        <p className='text-xl font-semibold lg:text-2xl my-3'>
                            More jobs from {data.job.referenceID.username}
                        </p>

                        <ErrorBoundary
                            fallback={<MoreJobsError onRetry={hadleRetry} />}
                        >
                            <Suspense fallback={<MoreJobsSkeleton />}>
                                <MoreJobsList
                                    referenceId={data.job.referenceID._id}
                                    companyName={data.job.referenceID.username}
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