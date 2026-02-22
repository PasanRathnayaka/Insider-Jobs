import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useApplyJob } from "../hooks/jobs/useApplyJob";
import { useAuth } from "../context/AuthProvider"


const JobCard = ({ ...props }) => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const { mutate } = useApplyJob();

    const handleApplyJob = (jobId, recruiterId) => {
        if (!user) {
            navigate("/auth");
            return;
        }

        mutate({
            jobId,
            recruiterId
        });
    };


    return (
        <div
            key={props._id}
            className="flex flex-col justify-between px-3 py-5 rounded shadow"
        >
            {/* Header */}
            <div>
                <img
                    className='size-10'
                    src={assets.company_icon}
                    alt="company-logo"
                    loading='lazy'
                />

                <p className='mt-3 text-xl'>{props.title}</p>

                <div className='flex items-center gap-3 my-3'>
                    <div className='inline-block text-center text-[14px] whitespace-nowrap rounded border text-gray-500  border-blue-200 bg-blue-50 py-1 px-3 '>
                        {props.location}
                    </div>
                    <div className='inline-block text-center text-[14px] whitespace-nowrap rounded border text-gray-500 border-red-200 bg-red-50 py-1 px-3 '>
                        {props.level}
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="h-30">
                <p className="text-gray-500 mt-4 line-clamp-3">
                    {props.description.slice(0, 150)}
                </p>
            </div>

            {/* Footer */}
            <div className='flex items-center gap-4 mt-4'>
                <button
                    className='inline-block text-center text-base whitespace-nowrap py-1 px-3 rounded bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                    onClick={() =>
                        handleApplyJob(props._id, props.referenceID)
                    }
                >
                    Apply now
                </button>

                <button
                    className='inline-block text-center text-base whitespace-nowrap py-1 px-3 rounded border border-gray-300 hover:bg-gray-100 text-gray-500 cursor-pointer'
                    onClick={() => navigate(`/job-details/${props._id}`)}
                >
                    Learn more
                </button>
            </div>
        </div>
    );
};

export default JobCard;