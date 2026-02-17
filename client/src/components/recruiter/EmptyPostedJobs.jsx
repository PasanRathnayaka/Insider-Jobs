import { FileExclamationPointIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";


const EmptyPostedJobs = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full h-80 -z-0 flex flex-col items-center justify-center gap-4 rounded-lg bg-gray-50">

            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100">
                <FileExclamationPointIcon className="size-8 text-gray-500" />
            </div>


            <h2 className="text-lg font-semibold text-gray-700">
                No Jobs Posted Yet
            </h2>

            <p className="text-sm text-gray-500 text-center max-w-md">
                You haven’t posted any jobs yet. Once you create a job, it will appear
                here and be visible to applicants.
            </p>

            <button
                className="mt-2 px-5 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition cursor-pointer"
                onClick={() => navigate("/recruiter/add-job")}
            >
                + Post a Job
            </button>
        </div>
    );
};

export default EmptyPostedJobs;
