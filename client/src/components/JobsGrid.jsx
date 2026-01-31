import { Link, useNavigate } from "react-router-dom";
import { useJobs } from "../hooks/useJobs";
import { assets } from "../assets/assets";


const JobsGrid = ({ currentPage, setCurrentPage }) => {
    const navigate = useNavigate();
    const { data } = useJobs(currentPage);

    const { jobs, pages } = data;

    if (jobs.length === 0) {
        return (
            <div className="w-full h-80 flex items-center justify-center">
                <h2>No jobs found!</h2>
            </div>
        );
    }

    return (
        <div className="w-full h-full">
            {/* Jobs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {jobs.map((data) => (
                    <div
                        key={data._id}
                        className="flex flex-col justify-between px-3 py-5 rounded shadow"
                    >
                        {/* Header */}
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

                        {/* Body */}
                        <div className="h-30">
                            <p className="text-gray-500 mt-4 line-clamp-3">
                                {data.description.slice(0, 150)}
                            </p>
                        </div>

                        {/* Footer */}
                        <div className='flex items-center gap-4 mt-4'>
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
