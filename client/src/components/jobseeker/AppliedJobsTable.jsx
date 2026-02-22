import { assets } from "../../assets/assets";
import { useAppliedJobs } from "../../hooks/applications/useAppliedJobs";
import AppliedJobsEmpty from "./AppliedJobsEmpty";



const AppliedJobsTable = () => {

    const { data } = useAppliedJobs();


    return (
        data?.data?.length === 0 ? (
            <AppliedJobsEmpty />
        ) : (
            < div className='overflow-x-auto scroll-smooth' >
                <table className='table-auto min-w-full text-md text-left'>
                    <thead>
                        <tr className='border border-gray-300'>
                            <th className='text-start p-3'>Company</th>
                            <th className='text-start p-3'>Job Title</th>
                            <th className='text-start p-3'>Location</th>
                            <th className='text-start p-3'>Date</th>
                            <th className='text-start p-3'>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data?.data?.map((application) => (
                            <tr key={application._id} className='border border-gray-300 text-gray-500 max-lg:space-x-5'>
                                <td className='flex items-center gap-3 p-3'>
                                    <img className='max-lg:w-5' src={assets.company_icon} alt="recruiter-profile-image" />
                                    {application.recruiterName}
                                </td>
                                <td className='p-3 whitespace-nowrap'>{application.jobTitle}</td>
                                <td className='p-3 whitespace-nowrap'>{application.jobLocation}</td>
                                <td className='p-3 whitespace-nowrap'>{new Date(application.appliedAt).toLocaleDateString()}</td>
                                <td className='p-3 whitespace-nowrap'>
                                    <div
                                        className={`flex items-center justify-center text-sm min-w-auto lg:w-1/2 px-4 py-1 rounded-full 
                                                    ${application?.applicationStatus === "pending" && " bg-blue-100 text-blue-600"}
                                                    ${application?.applicationStatus === "reject" && "bg-red-100 text-red-600"}
                                                    ${application?.applicationStatus === "accept" && "bg-green-100 text-green-600"}
                                                    `}
                                    >
                                        {(application &&
                                            application.applicationStatus.charAt(0).toUpperCase() + application.applicationStatus.slice(1))
                                            ?? "status"
                                        }
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >
        )

    );
};

export default AppliedJobsTable;