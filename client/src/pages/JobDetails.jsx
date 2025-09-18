import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { assets, jobsData } from '../assets/assets'
import Footer from '../components/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import kconvert from 'k-convert';
import RelativeTime from '../components/RelativeTime';
import LodingAnimation from '../components/LodingAnimation';
import MobileMenu from '../components/MobileMenu';



const JobDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [fetchedData, setFetchedData] = useState(
        {
            job: {},
            relatedJobs: []
        }
    )

    console.log("type of requested id", typeof id, id);

    useEffect(() => {
        if (id) {
            const FetchJob = async () => {
                const fetchedJob = jobsData.find(job => String(job._id) === String(id));
                const fetchedRelatedJobs = jobsData.filter(job => job.companyId.name === fetchedJob.companyId.name);

                if (fetchedJob && fetchedRelatedJobs) {
                    setFetchedData(
                        {
                            job: fetchedJob,
                            relatedJobs: fetchedRelatedJobs
                        }
                    );
                }

            }
            FetchJob();
        }

        return;

    }, [id]);

    console.log("/fetchedData/job: ", fetchedData.job);
    console.log("fetchedData/relatedJobs", fetchedData.relatedJobs);

    return (
        <>
            <Navbar />
            <MobileMenu/>
      
            <div className='min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto mt-16'>

                {/* Job Details Banner*/}
                {fetchedData ? (
                    <>
                        <div className='flex max-lg:flex-col lg:items-center justify-between px-10 max-lg:px-6 py-8 max-lg:space-y-4 rounded-xl bg-sky-50 border-2 border-blue-200'>
                            <div className='flex flex-wrap md:flex-nowrap items-center gap-4'>
                                <div className='p-6 rounded-xl bg-white'>
                                    <img className='w-16' src={assets.company_icon} alt="" />
                                </div>

                                <div>
                                    <p className='text-2xl lg:text-3xl font-medium'>{fetchedData.job.title}</p>

                                    <div className='flex flex-wrap md:flex-nowrap items-center gap-3 md:gap-6 mt-3'>
                                        <div className='flex items-center gap-1'>
                                            <img src={assets.suitcase_icon} alt="" />
                                            <p className='text-sm text-gray-600'>{fetchedData.job.category}</p>
                                        </div>
                                        <div className='flex items-center gap-1'>
                                            <img src={assets.location_icon} alt="" />
                                            <p className='text-sm text-gray-600'>{fetchedData.job.location}</p>
                                        </div>
                                        <div className='flex items-center gap-1'>
                                            <img src={assets.person_icon} alt="" />
                                            <p className='text-sm text-gray-600'>{fetchedData.job.level}</p>
                                        </div>
                                        <div className='flex items-center gap-1'>
                                            <img src={assets.money_icon} alt="" />
                                            <p className='text-sm text-gray-600'>{kconvert.convertTo(fetchedData.job.salary)}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className='max-lg:flex max-md:flex-col-reverse md:items-center max-lg:justify-between gap-3'>
                                <div>
                    
                                        <button onClick={() => navigate("/apply-job")} className='w-full py-2 px-8 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'>Apply now</button>
                                 
                                </div>
                                <div className='flex items-center md:justify-end mt-2'>
                                    <p className='text-gray-400 text-sm font-semibold'>Posted: {<RelativeTime timestamp={fetchedData.job.date} />}</p>
                                </div>
                            </div>
                        </div>


                        <div className='flex flex-row justify-between gap-10 lg:gap-20 xl:gap-30 max-lg:flex-col mt-8'>
                            <div className='flex-col lg:w-2/3'>
                                <p className='text-xl font-semibold lg:text-2xl my-3'>Job Description</p>
                                <div key={fetchedData.job._id} className='rich-text' dangerouslySetInnerHTML={{ __html: fetchedData.job.description }}></div>

                                <div>
                                    <Link to="/apply-job">
                                        <button className='px-6 py-2 mt-5 ml-2 text-white rounded bg-blue-600 hover:bg-blue-700 cursor-pointer'>Apply now</button>
                                    </Link>
                                </div>
                            </div>


                            <div className='flex-col max-lg:mt-10'>

                                <p className='text-xl font-semibold lg:text-2xl my-3'>More jobs from {fetchedData.job.category}</p>

                                {/* Job Card */}
                                {fetchedData.relatedJobs.map((job) => (
                                    <div key={job._id} className='flex flex-col p-5 border border-gray-100 rounded shadow mb-3'>
                                        <div>
                                            <img src={job.companyId.image} alt="" />
                                        </div>

                                        <p className='text-xl lg:text-2xl mt-3'>{job.title}</p>

                                        <div className='flex items-center gap-3 mt-3'>
                                            <button className='px-3 py-1 rounded border-2 border-blue-200 bg-blue-50 text-gray-500 text-sm'>{job.location}</button>
                                            <button className='px-3 py-1 rounded border-2 border-red-200 bg-red-50 text-gray-500 text-sm'>{job.level}</button>
                                        </div>

                                        <p className='mt-4 text-gray-500' dangerouslySetInnerHTML={{ __html: job.description.slice(0, 100) }}></p>

                                        <div className='flex items-center gap-3 mt-3'>
                                            <Link to="/apply-job">
                                                <button className='px-4 py-1.5 rounded border bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'>Apply now</button>
                                            </Link>
                                            <button
                                                className='px-4 py-1.5 rounded border border-gray-300 hover:bg-gray-100 text-gray-500 cursor-pointer'
                                                onClick={() => navigate(`/job-details/${job._id}`)}
                                            >
                                                Learn more
                                            </button>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </>
                ) : (
                    <>
                       <LodingAnimation/>
                    </>
                )}


                <Footer />
            </div>

        </>
    )
}

export default JobDetails