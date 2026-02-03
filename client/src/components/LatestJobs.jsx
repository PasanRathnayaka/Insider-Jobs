import { Suspense, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useSearch } from '../context/SearchProvider'
import JobsGrid from './JobsGrid.jsx'
import JobsGridSkeleton from './skeletons/JobsGridSkeleton.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'
import JobsGridError from './error-handlers/JobsGridError.jsx'



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

    const {
        currentSearched,
        setCurrentSearched,
        selectedCategory,
        setSelectedCategory,
        selectedLocation,
        setSelectedLocation,
    } = useSearch();

    const [currentPage, setCurrentPage] = useState(1);
    

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

    useEffect(() => {
        if (selectedCategory) {
            const categoryTimeId = setTimeout(() => {
                setSelectedCategory(selectedCategory);
            }, 1000);
        }
        if (selectedLocation) {
            const locationTimeId = setTimeout(() => {
                setSelectedLocation(selectedLocation);
            }, 100);
        }

        () => { clearTimeout(categoryTimeId) };
        () => { clearTimeout(locationTimeId) }
    }, [selectedCategory, selectedLocation]);




    return (

        <section className='mb-16 pb-12'>
            <div className='flex gap-4'>
                {/* Current Searched Results */}
                <div className='max-lg:hidden w-auto lg:pr-6'>
                    <div className={`${currentSearched.searchedTitle || currentSearched.searchedLocation ? "block" : "hidden"}`}>
                        <p className='font-semibold'>Current Search</p>
                        <div className='mt-2 space-y-3'>
                            {currentSearched.searchedTitle &&
                                <div className='flex items-center justify-between p-2 bg-blue-50 border-2 border-blue-200 rounded'>
                                    <p className='text-[13px] font-semibold text-gray-500 me-2 whitespace-nowrap'>{currentSearched.searchedTitle}</p>
                                    <img
                                        className='me-2 cursor-pointer'
                                        src={assets.cross_icon}
                                        onClick={() => {
                                            setCurrentSearched(prev => (
                                                {
                                                    ...prev,
                                                    searchedTitle: ""
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
                                        checked={category.category === selectedCategory}
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
                            {SearchByLocation.map((location, index) => (
                                <li key={index} className='flex items-center my-2 text-[14px] text-gray-500 font-semibold'>
                                    <input
                                        className='mr-2 whitespace-nowrap'
                                        type="checkbox"
                                        value={location.category}
                                        id="locationCheckbox"
                                        checked={location.category === selectedLocation}
                                        onChange={handleCheckboxChange}
                                    />
                                    {location.category} {`(${location.count})`}
                                </li>
                            ))}

                        </ul>
                    </div>
                </div>


                {/* Latest Jobs  */}
                <ErrorBoundary fallback={<JobsGridError />}>
                    <Suspense fallback={<JobsGridSkeleton />}>
                        <JobsGrid
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </Suspense>
                </ErrorBoundary>

            </div>
        </section >

    )
}

export default LatestJobs