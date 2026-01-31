import React, { Suspense, useEffect, useRef, useState } from 'react'
import { jobsData } from '../assets/assets'
import { assets } from '../assets/assets'
import { useSearch } from '../context/SearchProvider'
import { Link, useNavigate } from 'react-router-dom'
import { jobAPI } from '../utils/api.js'
import { useApplication } from '../context/ApplicationProvider.jsx'
import { useAuth } from '../context/AuthProvider.jsx'
import JobsGrid from './JobsGrid.jsx'


const SearchByCategory = [
    {
        _id: 1,
        category: "Programming",
        count: 24
    },
    {
        _id: 2,
        category: "Marketing",
        count: 41
    },
    {
        _id: 3,
        category: "Designing",
        count: 15
    },
    {
        _id: 4,
        category: "Accounting",
        count: 22
    },
    {
        _id: 5,
        category: "Analytics",
        count: 35
    },
    {
        _id: 6,
        category: "Developing",
        count: 50
    },
    {
        _id: 1,
        category: "Financing",
        count: 32
    }
]

const SearchByLocation = [
    {
        _id: 1,
        category: "UK",
        count: 24
    },
    {
        _id: 2,
        category: "USA",
        count: 41
    },
    {
        _id: 3,
        category: "India",
        count: 15
    },
    {
        _id: 4,
        category: "Australia",
        count: 22
    },
    {
        _id: 5,
        category: "UAE",
        count: 35
    },
    {
        _id: 6,
        category: "Newzeland",
        count: 50
    },
    {
        _id: 1,
        category: "Canada",
        count: 32
    }
]


const LatestJobs = () => {

    const { currentSearched, setCurrentSearched } = useSearch();
    const { createJobApplication } = useApplication();
    const { user } = useAuth();
    const navigate = useNavigate();

    const itemsPerPage = 9;
    const totalPages = Math.ceil(jobsData.length / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [jobs, setJobs] = useState([]);
    const [seletedCategory, setSelectedCategory] = useState("");
    const [seletedLocation, setSelectedLocation] = useState("");
    //const [search, setSearch] = useState("");
    const [searchedResult, setSearchedResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);



    // useEffect(() => {

    //     const fetchPaginatedJobs = async () => {

    //         try {
    //             setIsLoading(true);
    //             const { data } = await jobAPI.jobs({ page: currentPage });

    //             const paginatedJobs = data.paginatedResult.paginatedJobs;
    //             const { page, totalPages, totalJobs } = data.paginatedResult.paginatedInfo;

    //             setJobs(paginatedJobs);
    //             setPages(totalPages);
    //         } catch (error) {
    //             console.error("Error in fetching paginated job result", error);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     }

    //     fetchPaginatedJobs();

    // }, [currentPage])


    const job = {
        id: "683d76cbf285f37868a6b082",
        title: "full stack developer",
        category: "programming",
        location: "USA",
        level: "senior",
        salary: 50000,
        referenceID: "68398b032ab55b9994032361"
    }


    //To apply a job
    const handleJobApplication = () => {
        createJobApplication(job.id, user.id, job.referenceID);
    }

    const handleCheckboxChange = (e) => {
        const { id, value, checked } = e.target;

        if (id === "categoryCheckbox") {
            if (checked) {
                setSelectedCategory(value);
            }
            else {
                setSelectedCategory("");
            }
        }

        if (id === "locationCheckbox") {
            if (checked) {
                setSelectedLocation(value);
            }
            else {
                setSelectedLocation("");
            }
        }
    }



    return (

        <section className='mb-16 pb-12'>
            <div className='flex gap-4'>
                {/* Current Searched Results */}
                <div className='max-lg:hidden w-auto lg:pr-6'>
                    <div className={`${currentSearched.searchedValue || currentSearched.searchedLocation ? "block" : "hidden"}`}>
                        <p className='font-semibold'>Current Search</p>
                        <div className='mt-2 space-y-3'>
                            {currentSearched.searchedValue &&
                                <div className='flex items-center justify-between p-2 bg-blue-50 border-2 border-blue-200 rounded'>
                                    <p className='text-[13px] font-semibold text-gray-500 me-2 whitespace-nowrap'>{currentSearched.searchedValue}</p>
                                    <img
                                        className='me-2 cursor-pointer'
                                        src={assets.cross_icon}
                                        onClick={() => {
                                            setCurrentSearched(prev => (
                                                {
                                                    ...prev,
                                                    searchedValue: ""
                                                }
                                            ))
                                        }}
                                    />
                                </div>
                            }

                            {currentSearched.searchedLocation &&
                                <div className='flex items-center justify-between p-2 bg-red-50 border-2 border-red-200 rounded'>
                                    <p className='text-[13px] font-semibold text-gray-500 whitespace-nowrap'>{currentSearched.searchedLocation}</p>
                                    <img
                                        className='mx-2 cursor-pointer'
                                        src={assets.cross_icon}
                                        onClick={() => {
                                            setCurrentSearched(prev => (
                                                {
                                                    ...prev,
                                                    searchedLocation: ""
                                                }
                                            ))
                                        }}
                                    />
                                </div>
                            }

                        </div>
                    </div>


                    <p className='font-semibold whitespace-nowrap'>Search By Categories</p>

                    <div className='mt-3'>
                        <ul>
                            {SearchByCategory.map((category, index) => (
                                <li key={index} className='flex items-center my-2 text-[14px] text-gray-500 font-semibold'>
                                    <input
                                        className='mr-2 whitespace-nowrap'
                                        type="checkbox"
                                        value={category.category}
                                        id="categoryCheckbox"
                                        onChange={handleCheckboxChange}
                                    />
                                    {category.category} {`(${category.count})`}
                                </li>
                            ))}

                        </ul>
                    </div>

                    <p className='font-semibold mt-8 whitespace-nowrap'>Search By Location</p>

                    <div className='mt-3'>
                        <ul>
                            {SearchByLocation.map((category, index) => (
                                <li key={index} className='flex items-center my-2 text-[14px] text-gray-500 font-semibold'>
                                    <input
                                        className='mr-2 whitespace-nowrap'
                                        type="checkbox"
                                        value={category.category}
                                        id="locationCheckbox"
                                        onChange={handleCheckboxChange}
                                    />
                                    {category.category} {`(${category.count})`}
                                </li>
                            ))}

                        </ul>
                    </div>
                </div>


                {/* Latest Jobs  */}
                <Suspense
                    fallback={
                        <div className="w-full h-80 flex items-center justify-center">
                            <div className="size-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    }
                >
                    <JobsGrid
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </Suspense>

            </div>
        </section >

    )
}

export default LatestJobs