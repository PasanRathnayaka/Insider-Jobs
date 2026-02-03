import { useState } from 'react'
import microsoft_logo from '../assets/logos/microsoft_logo.svg'
import adobe_logo from '../assets/logos/adobe_logo.png'
import walmart_logo from '../assets/logos/walmart_logo.svg'
import accenture_logo from '../assets/logos/accenture_logo.png'
import { useSearch } from '../context/SearchProvider'
import { MapPinIcon, SearchIcon, X } from 'lucide-react';


const Hero = () => {

    const { currentSearched, setCurrentSearched } = useSearch();

    const [jobTitle, setJobTitle] = useState("");
    const [location, setLocation] = useState("");


    const handleSearch = () => {
        setCurrentSearched(
            {
                searchedTitle: jobTitle,
                searchedLocation: location
            }
        );
    };

    const clearSearchedJobTitle = () => {
        setJobTitle("");
        if (currentSearched.searchedTitle) {
            setCurrentSearched((prev) => prev.searchedTitle = "");
        }
    };

    const clearSearchedLocation = () => {
        setLocation("");
        if (currentSearched.searchedLocation) {
            setCurrentSearched((prev) => prev.searchedLocation = "");;
        }
    };

    

    return (

        <>
            <section className='mb-16 pb-20'>
                <div className="flex flex-col px-5 py-16 rounded-xl bg-gradient-to-r from-purple-800  via-purple-950 to-black text-center">
                    <h2 className="text-4xl font-bold text-white">Over 10,000+ jobs to apply</h2>
                    <p className="mt-5 text-white text-[14px]">Your Next Big Career Move Starts Right Here - Explore The Best Job Opportunities <br />
                        And Take The First Step Toward Your Future!
                    </p>

                    <div className='flex flex-col md:flex-row items-center mt-5 mx-auto max-md:space-y-3 text-black text-[14px] p-1 rounded bg-white max-md:bg-fuchsia-50'>
                        <div className='flex items-center pl-3 max-md:p-2 w-64'>
                            <SearchIcon className='text-gray-400' />
                            <input
                                className='p-1 border-0 outline-0 text-gray-600 font-medium'
                                type="text"
                                placeholder='Search for jobs'
                                value={jobTitle}
                                onChange={(e) => { setJobTitle(e.target.value) }}
                            />
                            {jobTitle &&
                                <button onClick={clearSearchedJobTitle}>
                                    <X size={20} className='text-gray-400 cursor-pointer' />
                                </button>
                            }
                        </div>

                        <p className='hidden md:block text-gray-600'>|</p>

                        <div className='flex items-center pl-3 max-md:p-2 w-64'>
                            <MapPinIcon className='text-gray-400' />
                            <input
                                className='p-1 border-0 outline-0 text-gray-600 font-medium'
                                type="text"
                                placeholder='Location'
                                value={location}
                                onChange={(e) => { setLocation(e.target.value) }}
                            />
                            {location &&
                                <button onClick={clearSearchedLocation}>
                                    <X size={20} className='text-gray-400 cursor-pointer' />
                                </button>
                            }
                        </div>

                        <button
                            className='bg-blue-600 px-4 py-2 rounded text-white cursor-pointer hover:bg-blue-700'
                            disabled={!jobTitle && !location}
                            onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                </div>


                <div className='mt-10 p-4 border border-gray-200 shadow rounded flex flex-wrap lg:flex-row items-center justify-center gap-8 lg:gap-15'>
                    <span className='text-[20px] text-gray-500'>Trusted By</span>

                    <div>
                        <img
                            className='w-25'
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png"
                            alt=""
                        />
                    </div>
                    <div>
                        <img
                            className='w-25'
                            src={microsoft_logo}
                            alt=""
                        />
                    </div>
                    <div>
                        <img
                            className='w-25'
                            src={adobe_logo}
                            alt=""
                        />
                    </div>
                    <div>
                        <img
                            className='w-25'
                            src={walmart_logo}
                            alt=""
                        />
                    </div>
                    <div>
                        <img
                            className='w-25'
                            src={accenture_logo}
                            alt=""
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero