import React, { useState } from 'react'
import microsoft_logo from '../assets/logos/microsoft_logo.svg'
import adobe_logo from '../assets/logos/adobe_logo.png'
import walmart_logo from '../assets/logos/walmart_logo.svg'
import accenture_logo from '../assets/logos/accenture_logo.png'
import { useSearch } from '../context/SearchProvider'
import { jobAPI } from '../services/api.js'
import { useEffect } from 'react'


const Hero = () => {

    const { setCurrentSearched, currentSearched } = useSearch();

    const [job, setJob] = useState("");
    const [location, setLocation] = useState("");

    console.log("Current Searched in Hero Component: ", currentSearched);

    
    useEffect(() => {
        const Search = async () => {
            try {
                const {data} = await jobAPI.jobs({title: currentSearched.searchedTitle, location: currentSearched.searchedLocation});
                const searchedJobs = data.searchedJobsByTitleAndLocation;

                if (!searchedJobs) return console.error("Data not received!")

                return console.log("searched data received to hero component: ", searchedJobs);

            } catch (error) {
                console.error("Error in fetching search result", error);
            }
        }

        Search();
    }, [currentSearched]);



    const handleSearch = () => {
        setCurrentSearched(
            {
                searchedTitle: job,
                searchedLocation: location
            }
        )
    }


    return (

        <>
            <section className='mb-16 pb-20'>
                <div className="flex flex-col px-5 py-16 rounded-xl bg-gradient-to-r from-purple-800  via-purple-950 to-black text-center">
                    <h2 className="text-4xl font-bold text-white">Over 10,000+ jobs to apply</h2>
                    <p className="mt-5 text-white text-[14px]">Your Next Big Career Move Starts Right Here - Explore The Best Job Opportunities <br />
                        And Take The First Step Toward Your Future!
                    </p>

                    <div className='flex flex-col md:flex-row items-center mt-5 mx-auto max-md:space-y-3 text-black text-[14px] p-1 rounded bg-white max-md:bg-fuchsia-50'>
                        <div className='flex items-center pl-3 max-md:p-2'>
                            <img className='w-6' src="https://cdn-icons-png.flaticon.com/128/17216/17216943.png" alt="" />
                            <input
                                className='p-1 border-0 outline-0 text-gray-600 font-medium'
                                type="search"
                                placeholder='Search for jobs'
                                value={job}
                                onChange={(e) => { setJob(e.target.value) }}
                            />
                        </div>

                        <p className='hidden md:block text-gray-600'>|</p>

                        <div className='flex items-center pl-3 max-md:p-2'>
                            <img className='w-6' src="https://cdn-icons-png.flaticon.com/128/10391/10391990.png" alt="" />
                            <input
                                className='p-1 border-0 outline-0 text-gray-600 font-medium'
                                type="search"
                                placeholder='Location'
                                value={location}
                                onChange={(e) => { setLocation(e.target.value) }}
                            />
                        </div>

                        <button className='bg-blue-600 w-full p-2 rounded text-white cursor-pointer hover:bg-blue-700' onClick={handleSearch}>Search</button>
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