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

                    <div className='flex flex-col md:flex-row items-center mt-8 mx-auto w-full max-w-3xl text-black text-[14px] md:p-1.5 md:rounded-full bg-transparent md:bg-white max-md:space-y-3 md:shadow-lg'>

                        <div className='flex items-center w-full md:w-1/2 px-4 py-2 md:py-0 md:pl-5 md:pr-3 bg-white rounded-xl md:rounded-none md:bg-transparent shadow-sm md:shadow-none'>
                            <SearchIcon className='text-gray-400 size-5 min-w-[20px]' />
                            <input
                                className='w-full p-2 border-0 outline-none text-gray-700 font-medium bg-transparent'
                                type="text"
                                placeholder='Search for jobs'
                                value={jobTitle}
                                onChange={(e) => { setJobTitle(e.target.value) }}
                            />
                            {jobTitle &&
                                <button onClick={clearSearchedJobTitle} className='p-1 hover:bg-gray-100 rounded-full transition-colors'>
                                    <X size={16} className='text-gray-400 cursor-pointer hover:text-gray-600' />
                                </button>
                            }
                        </div>

                        <div className='hidden md:block w-px h-8 bg-gray-200 mx-2'></div>

                        <div className='flex items-center w-full md:w-1/2 px-4 py-2 md:py-0 md:pl-3 md:pr-4 bg-white rounded-xl md:rounded-none md:bg-transparent shadow-sm md:shadow-none'>
                            <MapPinIcon className='text-gray-400 size-5 min-w-[20px]' />
                            <input
                                className='w-full p-2 border-0 outline-none text-gray-700 font-medium bg-transparent'
                                type="text"
                                placeholder='Location'
                                value={location}
                                onChange={(e) => { setLocation(e.target.value) }}
                            />
                            {location &&
                                <button onClick={clearSearchedLocation} className='p-1 hover:bg-gray-100 rounded-full transition-colors'>
                                    <X size={16} className='text-gray-400 cursor-pointer hover:text-gray-600' />
                                </button>
                            }
                        </div>

                        <button
                            className={`w-full md:w-auto md:ml-1 md:mr-1 px-8 py-3.5 md:py-2.5 rounded-xl md:rounded-full font-medium transition-all shadow-sm ${(!jobTitle && !location) ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white cursor-pointer hover:bg-blue-700 hover:shadow-md'}`}
                            disabled={!jobTitle && !location}
                            onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                </div>


                <div className='mt-10 p-5 md:p-8 border border-gray-100 shadow-sm rounded-2xl bg-white flex flex-col items-center justify-center gap-6 overflow-hidden'>
                    <span className='text-sm text-gray-500 font-medium tracking-wider uppercase'>Trusted By Top Companies</span>

                    <div className='relative w-full flex overflow-hidden before:absolute before:left-0 before:top-0 before:w-12 before:h-full before:bg-gradient-to-r before:from-white before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:w-12 after:h-full after:bg-gradient-to-l after:from-white after:to-transparent after:z-10'>
                        <div className='flex items-center gap-10 md:gap-16 animate-marquee w-max'>
                            {/* First Set of Logos */}
                            <img className='w-24 md:w-28 object-contain h-8 md:h-9 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 cursor-pointer' src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png" alt="Google" />
                            <img className='w-24 md:w-28 object-contain h-8 md:h-9 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 cursor-pointer' src={microsoft_logo} alt="Microsoft" />
                            <img className='w-24 md:w-28 object-contain h-8 md:h-9 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 cursor-pointer' src={adobe_logo} alt="Adobe" />
                            <img className='w-24 md:w-28 object-contain h-8 md:h-9 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 cursor-pointer' src={walmart_logo} alt="Walmart" />
                            <img className='w-24 md:w-28 object-contain h-8 md:h-9 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 cursor-pointer' src={accenture_logo} alt="Accenture" />
                            <img className='w-24 md:w-28 object-contain h-8 md:h-9 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 cursor-pointer' src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png" alt="Google" />

                            {/* Duplicated Set of Logos for Seamless Scrolling Loop */}
                            <img className='w-24 md:w-28 object-contain h-8 md:h-9 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 cursor-pointer' src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png" alt="Google" />
                            <img className='w-24 md:w-28 object-contain h-8 md:h-9 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 cursor-pointer' src={microsoft_logo} alt="Microsoft" />
                            <img className='w-24 md:w-28 object-contain h-8 md:h-9 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 cursor-pointer' src={adobe_logo} alt="Adobe" />
                            <img className='w-24 md:w-28 object-contain h-8 md:h-9 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 cursor-pointer' src={walmart_logo} alt="Walmart" />
                            <img className='w-24 md:w-28 object-contain h-8 md:h-9 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 cursor-pointer' src={accenture_logo} alt="Accenture" />
                            <img className='w-24 md:w-28 object-contain h-8 md:h-9 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 cursor-pointer' src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png" alt="Google" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero