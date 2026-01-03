import React, { useEffect, useRef, useState } from 'react'
import { jobsData } from '../assets/assets'
import { assets } from '../assets/assets'
import { useSearch } from '../context/SearchProvider'
import { Link, useNavigate } from 'react-router-dom'
import { jobAPI, userAPI } from '../utils/api.js'
import { useApplication } from '../context/ApplicationProvider.jsx'
import { useAuth } from '../context/AuthProvider.jsx'

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

{/*const cardData = [
    {
        h4: "Hello, card",
        p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum facere perspiciatis aspernatur at, neque,nostrum distinctio, nesciunt quaerat sequi blanditiis sapiente repellat sunt.Explicabo, nihil? Fugiat quae voluptatibus rerum incidunt."
    },
    {
        h4: "Hello, card",
        p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum facere perspiciatis aspernatur at, neque,nostrum distinctio, nesciunt quaerat sequi blanditiis sapiente repellat sunt.Explicabo, nihil? Fugiat quae voluptatibus rerum incidunt."
    },
    {
        h4: "Hello, card",
        p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum facere perspiciatis aspernatur at, neque,nostrum distinctio, nesciunt quaerat sequi blanditiis sapiente repellat sunt.Explicabo, nihil? Fugiat quae voluptatibus rerum incidunt."
    },
    {
        h4: "Hello, card",
        p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum facere perspiciatis aspernatur at, neque,nostrum distinctio, nesciunt quaerat sequi blanditiis sapiente repellat sunt.Explicabo, nihil? Fugiat quae voluptatibus rerum incidunt."
    },
    {
        h4: "Hello, card",
        p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum facere perspiciatis aspernatur at, neque,nostrum distinctio, nesciunt quaerat sequi blanditiis sapiente repellat sunt.Explicabo, nihil? Fugiat quae voluptatibus rerum incidunt."
    },
    {
        h4: "Hello, card",
        p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum facere perspiciatis aspernatur at, neque,nostrum distinctio, nesciunt quaerat sequi blanditiis sapiente repellat sunt.Explicabo, nihil? Fugiat quae voluptatibus rerum incidunt."
    },
    {
        h4: "Hello, card",
        p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum facere perspiciatis aspernatur at, neque,nostrum distinctio, nesciunt quaerat sequi blanditiis sapiente repellat sunt.Explicabo, nihil? Fugiat quae voluptatibus rerum incidunt."
    },
    {
        h4: "Hello, card",
        p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum facere perspiciatis aspernatur at, neque,nostrum distinctio, nesciunt quaerat sequi blanditiis sapiente repellat sunt.Explicabo, nihil? Fugiat quae voluptatibus rerum incidunt."
    },
    {
        h4: "Hello, card",
        p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum facere perspiciatis aspernatur at, neque,nostrum distinctio, nesciunt quaerat sequi blanditiis sapiente repellat sunt.Explicabo, nihil? Fugiat quae voluptatibus rerum incidunt."
    },
    {
        h4: "Hello, card",
        p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum facere perspiciatis aspernatur at, neque,nostrum distinctio, nesciunt quaerat sequi blanditiis sapiente repellat sunt.Explicabo, nihil? Fugiat quae voluptatibus rerum incidunt."
    },
    {
        h4: "Hello, card",
        p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum facere perspiciatis aspernatur at, neque,nostrum distinctio, nesciunt quaerat sequi blanditiis sapiente repellat sunt.Explicabo, nihil? Fugiat quae voluptatibus rerum incidunt."
    },
    {
        h4: "Hello, card",
        p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum facere perspiciatis aspernatur at, neque,nostrum distinctio, nesciunt quaerat sequi blanditiis sapiente repellat sunt.Explicabo, nihil? Fugiat quae voluptatibus rerum incidunt."
    },

]*/}

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
    //console.log("Current Searched in LatestJobs: ", currentSearched);



    useEffect(() => {

        const fetchPaginatedJobs = async () => {

            try {
                const { data } = await jobAPI.jobs({ page: currentPage });

                const paginatedJobs = data.paginatedResult.paginatedJobs;
                const { page, totalPages, totalJobs } = data.paginatedResult.paginatedInfo;

                setJobs(paginatedJobs);
                setPages(totalPages);
            } catch (error) {
                console.error("Error in fetching paginated job result", error);
            }


        }

        fetchPaginatedJobs();
    }, [currentPage])

    console.log("paginated items: ", jobs);


    // useEffect(() => {
    //     const fetchSearchResult = async () => {
    //         try {
    //             const searchedResult = await jobAPI.searchJobsByTitleAndLocation(currentSearched);

    //             if (!searchedResult) return console.error("Data not received!");

    //             return console.log("data received to Latest Jobs page: ", searchedResult);

    //         } catch (error) {
    //             console.error("Error in fetching search result by title and location", error);
    //         }
    //     }

    //     fetchSearchResult();

    // }, [currentSearched])


    // useEffect(() => {
    //     const filterJobs = async () => {
    //         try {
    //             const { data } = await jobAPI.jobs({category: seletedCategory, location: seletedLocation});
    //             const filteredJobs = data.filteredJobs;

    //             console.log("Filtered jobs from latest jobs page: ", filteredJobs);
    //         } catch (error) {
    //             console.error("Error in filtering result by category and location", error);
    //         }
    //     }

    //     filterJobs();
    // }, [seletedCategory, seletedLocation])



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

    console.log("SELECTED CATEGORY: ", seletedCategory);
    console.log("SELECTED LOCATON: ", seletedLocation);


    // useEffect(() => {

    //     const fetchSearchResult = async () => {

    //         try {
    //             const searchedResult = await jobAPI.searchJobs(currentSearched);

    //             if (!searchedResult) return console.error("Data not received!")

    //             return console.log("data received to Latest Jobs page: ", searchedResult);

    //         } catch (error) {
    //             console.error("Error in fetching search result", error);
    //         }
    //     }

    //     fetchSearchResult();

    // }, [currentSearched])



    // {jobs.map((job) => console.log("PAGINATED JOBS: ", job))}
    { Array.from({ length: pages }, (_, i) => console.log("PAGES", i)) }


    const paginatedItems = jobsData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );



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
                <div>
                    {/* <p className='text-2xl font-semibold'>Latest Jobs</p>
                    <p className='text-gray-500 mt-1 mb-10'>Get your desired job from top companies</p> */}

                    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>

                        {jobs.map((data, index) => (

                            // Card
                            <div key={index} className='flex flex-col justify-between px-3 py-5 rounded shadow'>

                                {/* Card Header */}
                                <div>
                                    <img className='size-10' src={assets.company_icon} alt="company-logo" loading='lazy' />

                                    <p className='mt-3 text-xl'>{data.title}</p>

                                    <div className='flex items-center gap-3 my-3'>
                                        <div className='inline-block text-center text-[14px] whitespace-nowrap rounded border text-gray-500  border-blue-200 bg-blue-50 py-1 px-3 '>
                                            {data.location}
                                        </div>
                                        <div className='inline-block text-center text-[14px] whitespace-nowrap rounded border text-gray-500 border-red-200 bg-red-50 py-1 px-3 '>
                                            {data.level}
                                        </div>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className='flex flex-col h-30 mt-4'>
                                    <p className='text-gray-500' dangerouslySetInnerHTML={{ __html: data.description.slice(0, 150) }}></p>
                                </div>

                                {/* Card Footer */}
                                <div className='flex items-center gap-3 mt-4'>
                                    <Link to="/apply-job">
                                        <button
                                            className='inline-block text-center text-base whitespace-nowrap py-1 px-3 rounded bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                                            onClick={() => navigate("/apply-job")}
                                        >
                                            Apply now
                                        </button>
                                    </Link>

                                    <button
                                        className='inline-block text-center text-base whitespace-nowrap py-1 px-3 rounded border border-gray-300 hover:bg-gray-100 text-gray-500 cursor-pointer'
                                        onClick={() => navigate(`/job-details/${data._id}`)}
                                    >
                                        Learn more
                                    </button>
                                </div>

                            </div>
                        ))}

                    </div>

                    <div className='flex items-center justify-center gap-6 mt-10'>
                        <div>
                            <img className='cursor-pointer hover:-translate-x-1 p-1' src={assets.left_arrow_icon} alt="" />
                        </div>
                        <div className='flex items-center justify-center gap-3'>
                            {Array.from({ length: pages }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`text-center px-3 py-1 rounded border border-gray-300 ${currentPage === index + 1 && "bg-blue-200"} cursor-pointer hover:bg-blue-100`}
                                >
                                    {index + 1}
                                </button>
                            ))}

                        </div>
                        <div>
                            <img className='cursor-pointer hover:translate-x-1 p-1' src={assets.right_arrow_icon} alt="" />
                        </div>
                    </div>

                </div>
            </div>
        </section>

    )
}

export default LatestJobs