import { Suspense, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useSearch } from '../context/SearchProvider'
import JobsGrid from './JobsGrid.jsx'
import JobsGridSkeleton from './skeletons/JobsGridSkeleton.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'
import JobsGridError from './error-handlers/JobsGridError.jsx'
import { Filter, X } from 'lucide-react'



import { useJobFilters } from '../hooks/jobs/useJobFilters.js'

const JobFilterListsSkeleton = () => (
    <div className='animate-pulse pt-2 lg:pt-0'>
        <div className='h-5 w-36 bg-gray-200 rounded mb-4'></div>
        <div className='space-y-4 mb-8'>
            {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className='flex items-center gap-3'>
                    <div className='size-4 bg-gray-200 rounded'></div>
                    <div className='h-4 w-28 bg-gray-200 rounded'></div>
                </div>
            ))}
        </div>
        <div className='h-5 w-36 bg-gray-200 rounded mb-4 mt-8'></div>
        <div className='space-y-4'>
            {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className='flex items-center gap-3'>
                    <div className='size-4 bg-gray-200 rounded'></div>
                    <div className='h-4 w-28 bg-gray-200 rounded'></div>
                </div>
            ))}
        </div>
    </div>
);

const JobFilterLists = ({ selectedCategory, selectedLocation, handleCheckboxChange }) => {
    const { data } = useJobFilters();
    const categories = data?.categories || [];
    const locations = data?.locations || [];

    return (
        <>
            <p className='font-semibold text-gray-800 pt-2 lg:pt-0 whitespace-nowrap'>Search By Categories</p>
            <div className='mt-4'>
                <ul className='space-y-3'>
                    {categories.map((category, index) => (
                        <li key={index} className='flex items-center text-[14px] text-gray-600 font-medium group'>
                            <input
                                className='mr-3 size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer'
                                type="checkbox"
                                value={category.category}
                                id={`categoryCheckbox-${index}`}
                                checked={category.category === selectedCategory}
                                onChange={(e) => {
                                    e.target.id = "categoryCheckbox";
                                    handleCheckboxChange(e);
                                }}
                            />
                            <label htmlFor={`categoryCheckbox-${index}`} className='cursor-pointer group-hover:text-blue-600 transition-colors w-full'>
                                {category.category} <span className='text-gray-400 font-normal ml-1'>({category.count})</span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            <p className='font-semibold text-gray-800 mt-8 whitespace-nowrap'>Search By Location</p>
            <div className='mt-4'>
                <ul className='space-y-3'>
                    {locations.map((location, index) => (
                        <li key={index} className='flex items-center text-[14px] text-gray-600 font-medium group'>
                            <input
                                className='mr-3 size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer'
                                type="checkbox"
                                value={location.category}
                                id={`locationCheckbox-${index}`}
                                checked={location.category === selectedLocation}
                                onChange={(e) => {
                                    e.target.id = "locationCheckbox";
                                    handleCheckboxChange(e);
                                }}
                            />
                            <label htmlFor={`locationCheckbox-${index}`} className='cursor-pointer group-hover:text-blue-600 transition-colors w-full'>
                                {location.category} <span className='text-gray-400 font-normal ml-1'>({location.count})</span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};


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
    const [showMobileFilters, setShowMobileFilters] = useState(false);


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
        let categoryTimeId = null;
        let locationTimeId = null;

        if (selectedCategory) {
            categoryTimeId = setTimeout(() => {
                setSelectedCategory(selectedCategory);
            }, 1000);
        }
        if (selectedLocation) {
            locationTimeId = setTimeout(() => {
                setSelectedLocation(selectedLocation);
            }, 100);
        }

        () => { clearTimeout(categoryTimeId) };
        () => { clearTimeout(locationTimeId) }
    }, [selectedCategory, selectedLocation]);




    return (

        <section className='mb-16 pb-12'>

            {/* Mobile Filter Toggle Button */}
            <div className='lg:hidden w-full mb-6'>
                <button
                    onClick={() => setShowMobileFilters(true)}
                    className='flex items-center justify-center gap-2 w-full py-3 bg-white border border-gray-200 shadow-sm rounded-xl text-gray-700 font-medium hover:bg-gray-50 active:scale-[0.98] transition-all'
                >
                    <Filter size={18} className='text-gray-500' />
                    Filter Jobs
                </button>
            </div>

            <div className='flex flex-col lg:flex-row gap-4'>

                {/* Filters Sidebar (Desktop) & Overlay (Mobile) */}
                <div className={`
                    fixed inset-0 z-50 bg-black/50 lg:bg-transparent lg:static lg:block lg:w-64 lg:pr-6 shrink-0 transition-opacity duration-300
                    ${showMobileFilters ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto"}
                `}>
                    <div className={`
                        absolute lg:static top-0 right-0 h-full w-[280px] lg:w-auto bg-white lg:bg-transparent shadow-2xl lg:shadow-none p-6 lg:p-0 overflow-y-auto transform transition-transform duration-300
                        ${showMobileFilters ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
                    `}>

                        <div className='flex justify-between items-center mb-6 lg:hidden'>
                            <h2 className='text-lg font-bold text-gray-800'>Filters</h2>
                            <button onClick={() => setShowMobileFilters(false)} className='p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200'>
                                <X size={20} />
                            </button>
                        </div>

                        <div className={`${currentSearched.searchedTitle || currentSearched.searchedLocation ? "block" : "hidden"}`}>
                            <p className='font-semibold text-gray-800'>Current Search</p>
                            <div className='mt-3 mb-6 space-y-3'>
                                {currentSearched.searchedTitle &&
                                    <div className='flex items-center justify-between p-2.5 bg-blue-50/80 border border-blue-200 rounded-lg'>
                                        <p className='text-[13px] font-semibold text-blue-800 me-2 whitespace-nowrap'>{currentSearched.searchedTitle}</p>
                                        <button onClick={() => setCurrentSearched(prev => ({ ...prev, searchedTitle: "" }))}>
                                            <X size={16} className='text-blue-500 hover:text-blue-700 cursor-pointer' />
                                        </button>
                                    </div>
                                }

                                {currentSearched.searchedLocation &&
                                    <div className='flex items-center justify-between p-2.5 bg-red-50/80 border border-red-200 rounded-lg'>
                                        <p className='text-[13px] font-semibold text-red-800 whitespace-nowrap'>{currentSearched.searchedLocation}</p>
                                        <button onClick={() => setCurrentSearched(prev => ({ ...prev, searchedLocation: "" }))}>
                                            <X size={16} className='text-red-500 hover:text-red-700 cursor-pointer' />
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>

                        <ErrorBoundary fallback={<div className="text-red-500 text-sm p-4 bg-red-50 rounded-lg">Failed to load filters.</div>}>
                            <Suspense fallback={<JobFilterListsSkeleton />}>
                                <JobFilterLists
                                    selectedCategory={selectedCategory}
                                    selectedLocation={selectedLocation}
                                    handleCheckboxChange={handleCheckboxChange}
                                />
                            </Suspense>
                        </ErrorBoundary>

                        {/* Mobile Apply Button inside drawer */}
                        <div className='mt-8 pt-4 border-t border-gray-100 lg:hidden'>
                            <button
                                onClick={() => setShowMobileFilters(false)}
                                className='w-full py-3 bg-blue-600 text-white font-medium rounded-xl shadow-sm hover:bg-blue-700'
                            >
                                Apply Filters
                            </button>
                        </div>

                        {/* Mobile Clear Filters Button */}
                        <div className='mt-2 pt-2 border-t border-gray-100 lg:hidden'>
                            <button
                                onClick={() => {
                                    setSelectedCategory("");
                                    setSelectedLocation("");
                                    setShowMobileFilters(false);
                                }}
                                className='w-full py-3 bg-slate-300 text-slate-600 font-medium rounded-xl shadow-sm hover:bg-slate-400'
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Latest Jobs  */}
                <div className='flex-1 lg:pl-4'>
                    <ErrorBoundary fallback={<JobsGridError />}>
                        <Suspense fallback={<JobsGridSkeleton />}>
                            <JobsGrid
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            />
                        </Suspense>
                    </ErrorBoundary>
                </div>
            </div>
        </section >

    )
}

export default LatestJobs