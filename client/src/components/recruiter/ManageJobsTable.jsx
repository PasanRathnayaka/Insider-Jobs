import { useState } from "react";
import { assets } from "../../assets/assets";
import { usePostedJobs } from "../../hooks/usePostedJobs";
import EmptyPostedJobs from "./EmptyPostedJobs";



const ManageJobsTable = () => {

    const [clickedVisibleIcon, setClickedVisibleIcon] = useState({});

    const { data: postedJobs } = usePostedJobs();


    const handleClickVisibleIcon = (id) => {
        setClickedVisibleIcon(prev => (
            {
                ...prev,
                [id]: !prev[id]
            }
        ));
    }



    return (

        postedJobs.length === 0 ? (
            <EmptyPostedJobs />
        ) : (
            < div className='overflow-x-auto scroll-smooth' >
                <table className='table-auto min-w-full text-md text-left'>
                    <thead>
                        <tr className='border border-gray-300'>
                            <th className='text-start p-3 text-slate-700'># ID</th>
                            <th className='text-start p-3 text-slate-700'>Job Title</th>
                            <th className='text-start p-3 text-slate-700'>Date</th>
                            <th className='text-start p-3 text-slate-700'>Location</th>
                            <th className='text-start p-3 text-slate-700'>Applicants</th>
                            <th className='text-start p-3 text-slate-700'>Visible</th>
                        </tr>
                    </thead>

                    <tbody>
                        {postedJobs.map((job, index) => (
                            <tr key={index} className='border border-gray-300 text-gray-500 max-lg:space-x-5'>
                                <td className='flex items-center gap-3 p-3'>{job._id}</td>
                                <td className='p-3 whitespace-nowrap'>{job.title}</td>
                                <td className='p-3 whitespace-nowrap'>{new Date(job.createdAt).toLocaleDateString()}</td>
                                <td className='p-3 whitespace-nowrap'>{job.location}</td>
                                <td className='p-3 whitespace-nowrap'>{job.applicants}</td>
                                <td className='p-3 whitespace-nowrap'>
                                    <div className='pl-5'>
                                        <button
                                            onClick={() => {
                                                handleClickVisibleIcon(job._id)
                                            }}
                                        >
                                            <img className='size-5 cursor-pointer'
                                                src={`${clickedVisibleIcon[job._id] ? assets.tick_icon_fill : assets.tick_icon}`}
                                            />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >
        ));
};

export default ManageJobsTable;