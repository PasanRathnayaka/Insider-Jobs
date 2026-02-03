import { useJobs } from "../hooks/useJobs";
import { assets } from "../assets/assets";
import JobCard from "./JobCard";
import { useEffect, useRef } from "react";


const JobsGrid = ({ currentPage, setCurrentPage }) => {

    const { data } = useJobs(currentPage);
    const { jobs, pages } = data;


    const gridRef = useRef(null);

    useEffect(() => {
        gridRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, [currentPage]);


    
    if (jobs.length === 0) {
        return (
            <div className="w-full h-80 flex items-center justify-center">
                <h2>No jobs found!</h2>
            </div>
        );
    }

    return (
        <div ref={gridRef} className="w-full h-full">
            {/* Jobs  */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {jobs.map((data) => (
                    <JobCard
                        key={data._id}
                        {...data}
                    />
                ))}
            </div>

            {/* Pagination */}
            {pages > 1 && (
                < div className='flex items-center justify-center gap-6 mt-10'>
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
            )}
        </div>
    );
};

export default JobsGrid;
