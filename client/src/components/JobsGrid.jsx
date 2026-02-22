import { useJobs } from "../hooks/jobs/useJobs";
import { assets } from "../assets/assets";
import JobCard from "./JobCard";
import { useEffect, useRef } from "react";
import { useSearch } from "../context/SearchProvider";
import { SearchXIcon } from "lucide-react";



const JobsGrid = ({ currentPage, setCurrentPage }) => {

    const {
        currentSearched,
        setCurrentSearched,
        selectedCategory,
        setSelectedCategory,
        selectedLocation,
        setSelectedLocation,
    } = useSearch();


    const { data } = useJobs({
        page: currentPage,
        title: currentSearched.searchedTitle,
        location: currentSearched.searchedLocation || selectedLocation,
        category: selectedCategory,
    });

    const { jobs, pages } = data;


    const gridRef = useRef(null);

    useEffect(() => {
        gridRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, [currentPage]);


    const handleReload = () => {
        window.location.reload();
    }

    const handleResetSearch = () => {
        setCurrentSearched({});
        setSelectedCategory("");
        setSelectedLocation("");
    };



    if (jobs === null || jobs === undefined || jobs.length === 0) {
        return (
            <div className="w-full h-80 flex flex-col items-center justify-center gap-4 text-center px-4">
                <div ><SearchXIcon size={50} className="text-gray-500" /></div>

                <h2 className="text-xl font-semibold text-gray-700">
                    No jobs found
                </h2>

                <p className="text-sm text-gray-500 max-w-md">
                    We couldn’t find any jobs matching your search.
                    Try changing the title or location, or browse all available jobs.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
                    <button
                        onClick={handleResetSearch}
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
                    >
                        Show all jobs
                    </button>

                    <button
                        onClick={handleReload}
                        className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
                    >
                        Try again
                    </button>
                </div>
            </div>

        );
    };

    return (
        <div ref={gridRef} className="w-full h-full">
            {/* Jobs  */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {jobs?.map((data) => (
                    <JobCard
                        key={data._id}
                        {...data}
                    />
                ))}
            </div>

            {/* Pagination */}
            {(pages || jobs?.length) > 1 && (
                < div className='flex items-center justify-center gap-6 mt-10'>
                    <div>
                        <img className='cursor-pointer hover:-translate-x-1 p-1' src={assets.left_arrow_icon} alt="" />
                    </div>
                    <div className='flex items-center justify-center gap-3'>
                        {Array.from({ length: pages || jobs.length }, (_, index) => (
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
            )}
        </div>
    );
};

export default JobsGrid;
