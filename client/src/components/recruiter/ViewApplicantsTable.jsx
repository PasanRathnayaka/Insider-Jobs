import { useState, useMemo } from "react";
import { useApplicants } from "../../hooks/applications/useApplicants";
import { assets } from "../../assets/assets";
import { useUpdateApplicationStatus } from "../../hooks/applications/useUpdateApplicationStatus";


const ViewApplicantsTable = () => {

    const { data } = useApplicants();
    const { mutate: updateStatus } = useUpdateApplicationStatus();


    const [activeTab, setActiveTab] = useState("pending");
    const [isActionSelected, setIsActionSelected] = useState({});

    const applications = data?.data ?? [];

    const filteredApplications = useMemo(() => {
        return applications.filter(
            (app) => app.applicationStatus === activeTab
        );
    }, [applications, activeTab]);


    const handleActionSelector = (id) => {
        setIsActionSelected((prev) => ({
            [id]: !prev[id],
        }));
    };

    const handleStatusChange = (id, newStatus) => {
        updateStatus({
            applicationId: id,
            status: newStatus,
        });

        setIsActionSelected({});
    };


    return (
        <>
            {/* tabs*/}
            <div className="flex gap-4 mb-6 border-b border-b-gray-200 pb-3">
                {["pending", "accept", "reject"].map((tab) => {
                    const isActive = activeTab === tab;

                    const baseStyle = "px-4 py-2 text-sm font-medium rounded-full transition cursor-pointer";

                    const activeStyles = {
                        pending: "bg-blue-100 text-blue-600",
                        accept: "bg-green-100 text-green-600",
                        reject: "bg-red-100 text-red-600",
                    };

                    return (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`${baseStyle} ${isActive
                                ? activeStyles[tab]
                                : "bg-gray-100 text-gray-500"
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    );
                })}
            </div>


            {filteredApplications.length === 0 ? (
                <div className="text-center py-16 text-gray-400 text-sm">
                    No {activeTab} applications found.
                </div>
            ) : (
                <div className="overflow-auto scroll-smooth">
                    <table className="table-auto min-w-full max-md:text-sm text-left">
                        <thead>
                            <tr className="border border-gray-300">
                                <th className="text-start p-3 text-slate-700"># ID</th>
                                <th className="text-start p-3 text-slate-700">User Name</th>
                                <th className="text-start p-3 text-slate-700">Job Title</th>
                                <th className="text-start p-3 text-slate-700">Location</th>
                                <th className="text-start p-3 text-slate-700">Resume</th>
                                <th className="text-start p-3 text-slate-700">Status</th>
                                {activeTab === "pending" && (
                                    <th className="text-start p-3 text-slate-700">Action</th>
                                )}
                            </tr>
                        </thead>

                        <tbody>
                            {filteredApplications.map((item) => (
                                <tr
                                    key={item._id}
                                    className="border border-gray-300 text-gray-500"
                                >
                                    <td className="p-3 whitespace-nowrap">
                                        {item._id.slice(0, 6)}
                                    </td>

                                    <td className="p-3 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <img
                                                className="size-8"
                                                src={
                                                    item.applicant.imageURL ??
                                                    assets.profile_img
                                                }
                                                alt="profile-img"
                                            />
                                            <p>{item.applicant.username}</p>
                                        </div>
                                    </td>

                                    <td className="p-3 whitespace-nowrap">
                                        {item.appliedJob.title}
                                    </td>

                                    <td className="p-3 whitespace-nowrap">
                                        {item.appliedJob.location}
                                    </td>

                                    <td className="p-3 whitespace-nowrap">
                                        <button className="cursor-pointer">
                                            <div className="flex items-center gap-3 py-1.5 px-4 bg-blue-50 rounded hover:bg-blue-100">
                                                <p className="text-blue-500 hidden md:block">
                                                    Resume
                                                </p>
                                                <img
                                                    className="size-4"
                                                    src={assets.resume_download_icon}
                                                    alt="download-resume-icon"
                                                />
                                            </div>
                                        </button>
                                    </td>

                                    {/* status-badges */}
                                    <td className="p-3 whitespace-nowrap text-end">
                                        <div
                                            className={`flex items-center justify-center w-20 py-1 rounded-full text-sm
                                                    ${item.applicationStatus === "pending" && "bg-blue-100 text-blue-600"}
                                                    ${item.applicationStatus === "reject" && "bg-red-100 text-red-600"}
                                                    ${item.applicationStatus === "accept" && "bg-green-100 text-green-600"}`}
                                        >
                                            {item.applicationStatus.charAt(0).toUpperCase() + item.applicationStatus.slice(1)}
                                        </div>
                                    </td>


                                    {activeTab === "pending" && (
                                        <td className="p-3 whitespace-nowrap relative">
                                            <button
                                                onClick={() =>
                                                    handleActionSelector(item._id)
                                                }
                                            >
                                                <img
                                                    className="size-5 cursor-pointer"
                                                    src={assets.three_dot_icon}
                                                    alt="action-icon"
                                                />
                                            </button>

                                            <div
                                                className={`absolute right-0 mt-2 flex flex-col py-2 px-2 bg-white shadow rounded-md space-y-2 z-10 ${isActionSelected[item._id]
                                                    ? "block"
                                                    : "hidden"
                                                    }`}
                                            >
                                                <button
                                                    className="cursor-pointer py-1 px-4 rounded bg-sky-50 text-blue-500 hover:bg-blue-100"
                                                    onClick={() =>
                                                        handleStatusChange(item._id, "accept")
                                                    }
                                                >
                                                    Accept
                                                </button>

                                                <button
                                                    className="cursor-pointer py-1 px-4 rounded bg-orange-50 text-orange-500 hover:bg-orange-100"
                                                    onClick={() =>
                                                        handleStatusChange(item._id, "reject")
                                                    }
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default ViewApplicantsTable;











// const ViewApplicantsTable = () => {

//     const [isActionSelected, setIsActionSelected] = useState({});

//     const { data } = useApplicants();


//     const handleActionSelector = (key) => {
//         if (key) {
//             setIsActionSelected(prev => (
//                 {
//                     [key]: !prev[key]
//                 }
//             ));
//         }
//     }

//     return (
//         data?.data?.length === 0 ? (
//             <ViewApplicantsEmpty />
//         ) : (
//             <div className='overflow-auto scroll-smooth'>
//                 <table className='table-auto min-w-full max-md:text-sm text-left'>
//                     <thead>
//                         <tr className='border border-gray-300'>
//                             <th className='text-start p-3 text-slate-700'># ID</th>
//                             <th className='text-start p-3 text-slate-700'>User Name</th>
//                             <th className='text-start p-3 text-slate-700'>Job Title</th>
//                             <th className='text-start p-3 text-slate-700'>Location</th>
//                             <th className='text-start p-3 text-slate-700'>Resume</th>
//                             <th className='text-start p-3 text-slate-700'>Status</th>
//                             <th className='text-start p-3 text-slate-700'>Action</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {data?.data?.map((data) => (
//                             <tr key={data._id} className='border border-gray-300 text-gray-500 max-lg:space-x-5'>

//                                 <td className='p-3 whitespace-nowrap'>{(data._id).slice(0, 6)}</td>
//                                 <td className='p-3 whitespace-nowrap'>
//                                     <div className='flex items-center gap-3'>
//                                         <img
//                                             className='size-8'
//                                             src={data.applicant.imageURL ?? assets.profile_img}
//                                             alt="profile-img"
//                                         />
//                                         <p>{data.applicant.username}</p>
//                                     </div>
//                                 </td>
//                                 <td className='p-3 whitespace-nowrap'>{data.appliedJob.title}</td>
//                                 <td className='p-3 whitespace-nowrap'>{data.appliedJob.location}</td>
//                                 <td className='p-3 whitespace-nowrap'>
//                                     <button className='cursor-pointer'>
//                                         <div className='flex items-center gap-3 py-1.5 px-4 bg-blue-50 rounded hover:bg-blue-100'>
//                                             <p className='text-blue-500 hidden md:block'>Resume</p>
//                                             <img
//                                                 className='size-4'
//                                                 src={assets.resume_download_icon}
//                                                 alt="download-resume-icon"
//                                             />
//                                         </div>
//                                     </button>
//                                 </td>
//                                 <td className='p-3 whitespace-nowrap'>
//                                     <div
//                                         className={`flex items-center justify-center min-w-auto lg:w-1/2 px-5 py-1 rounded-full text-sm
//                                                     ${data?.applicationStatus === "pending" && " bg-blue-100 text-blue-600"}
//                                                     ${data?.applicationStatus === "reject" && "bg-red-100 text-red-600"}
//                                                     ${data?.applicationStatus === "accept" && "bg-green-100 text-green-600"}
//                                                     `}
//                                     >
//                                         {data?.applicationStatus ?? "status"}
//                                     </div>
//                                 </td>
//                                 <td className='p-3 whitespace-nowrap static'>
//                                     <button
//                                         className='flex items-center ml-3'
//                                         id='action-btn'
//                                         onClick={() => handleActionSelector(data._id)}
//                                     >
//                                         <img className='size-5 cursor-pointer' src={assets.three_dot_icon} alt="" />
//                                     </button>


//                                     <div className={`absolute flex flex-col py-2 px-2 bg-white shadow rounded-md space-y-2
//                                     ${isActionSelected[data._id]
//                                             ? "block"
//                                             : "hidden"}`
//                                     }>
//                                         <button
//                                             className='cursor-pointer py-1 px-4 rounded bg-sky-50 text-blue-500 hover:bg-blue-100'
//                                             id='accept-btn'
//                                             onClick={() => {
//                                                 handleActionSelector(data._id);
//                                                 alert("Accepted")
//                                             }}
//                                         >
//                                             Accept
//                                         </button>
//                                         <button
//                                             className='cursor-pointer py-1 px-4 rounded bg-orange-50 text-orange-500 hover:bg-orange-100'
//                                             id='reject-btn'
//                                             onClick={() => {
//                                                 handleActionSelector(data._id);
//                                                 alert("Rejected")
//                                             }}
//                                         >
//                                             Reject
//                                         </button>
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         )
//     );
// };

// export default ViewApplicantsTable;