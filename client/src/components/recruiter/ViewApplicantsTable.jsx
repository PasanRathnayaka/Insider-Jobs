import { useState } from "react";
import { useApplicants } from "../../hooks/useApplicants";
import { assets } from "../../assets/assets";
import ViewApplicantsEmpty from "./ViewApplicantsEmpty";


const ViewApplicantsTable = () => {

    const [isActionSelected, setIsActionSelected] = useState({});

    const { data } = useApplicants();

    const handleActionSelector = (key) => {
        if (key) {
            setIsActionSelected(prev => (
                {
                    [key]: !prev[key]
                }
            ));
        }
    }

    return (
        data?.data?.length === 0 ? (
            <ViewApplicantsEmpty />
        ) : (
            <div className='overflow-x-auto scroll-smooth'>
                <table className='table-auto min-w-full max-md:text-sm text-left'>
                    <thead>
                        <tr className='border border-gray-300'>
                            <th className='text-start p-3 text-slate-700'>#</th>
                            <th className='text-start p-3 text-slate-700'>User Name</th>
                            <th className='text-start p-3 text-slate-700'>Job Title</th>
                            <th className='text-start p-3 text-slate-700'>Location</th>
                            <th className='text-start p-3 text-slate-700'>Resume</th>
                            <th className='text-start p-3 text-slate-700'>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data?.data?.map((data) => (
                            <tr key={data._id} className='border border-gray-300 text-gray-500 max-lg:space-x-5'>

                                <td className='p-3 whitespace-nowrap'>{data._id}</td>
                                <td className='p-3 whitespace-nowrap'>
                                    <div className='flex items-center gap-3'>
                                        <img
                                            className='size-8'
                                            src={data.applicant.imageURL ?? assets.profile_img}
                                            alt="profile-img"
                                        />
                                        <p>{data.applicant.username}</p>
                                    </div>
                                </td>
                                <td className='p-3 whitespace-nowrap'>{data.appliedJob.title}</td>
                                <td className='p-3 whitespace-nowrap'>{data.appliedJob.location}</td>
                                <td className='p-3 whitespace-nowrap'>
                                    <button className='cursor-pointer'>
                                        <div className='flex items-center gap-3 py-1.5 px-4 bg-blue-50 rounded hover:bg-blue-100'>
                                            <p className='text-blue-500 hidden md:block'>Resume</p>
                                            <img
                                                className='size-4'
                                                src={assets.resume_download_icon}
                                                alt="download-resume-icon"
                                            />
                                        </div>
                                    </button>
                                </td>
                                <td className='p-3 whitespace-nowrap static'>
                                    <button className='flex items-center ml-3' id='action-btn' onClick={() => { handleActionSelector(data._id) }}>
                                        <img className='size-5 cursor-pointer' src={assets.three_dot_icon} alt="" />
                                    </button>


                                    <div className={`absolute flex flex-col py-2 px-2 bg-white shadow rounded-md space-y-2 
                                    ${isActionSelected[data._id]
                                            ? "block"
                                            : "hidden"}`
                                    }>
                                        <button
                                            className='cursor-pointer py-1 px-4 rounded bg-sky-50 text-blue-500 hover:bg-blue-100'
                                            id='accept-btn'
                                            onClick={() => {
                                                handleActionSelector(data._id);
                                                alert("Accepted")
                                            }}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            className='cursor-pointer py-1 px-4 rounded bg-orange-50 text-orange-500 hover:bg-orange-100'
                                            id='reject-btn'
                                            onClick={() => {
                                                handleActionSelector(data._id);
                                                alert("Rejected")
                                            }}
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    );
};

export default ViewApplicantsTable;