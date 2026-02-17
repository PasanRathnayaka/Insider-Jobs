import { ServerCrash } from "lucide-react";
import { useNavigate } from "react-router-dom";


const PostedJobsError = () => {
    const navigate = useNavigate();


    const handleRetry = () => {
        window.location.reload();;
    };

    const handleNavigateToDashboard = () => {
        navigate("/recruiter/add-job");
    };


    return (
        <div className="w-full h-80 flex flex-col items-center justify-center gap-4 border border-red-200 rounded-lg bg-red-50">

            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
                <ServerCrash className="w-8 h-8 text-red-600" />
            </div>

            <h2 className="text-lg font-semibold text-red-700">
                Something went wrong
            </h2>

            <p className="text-sm text-red-600 text-center max-w-md">
                We couldn’t load your posted jobs right now. This might be a temporary
                issue. Please try again.
            </p>

            <div className="flex gap-3 mt-2">
                <button
                    onClick={handleRetry}
                    className="px-5 py-2 rounded-md bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition"
                >
                    Retry
                </button>

                <button
                    onClick={handleNavigateToDashboard}
                    className="px-5 py-2 rounded-md bg-white text-red-600 text-sm font-medium border border-red-300 hover:bg-red-100 transition"
                >
                    Go to Dashboard
                </button>
            </div>
        </div>
    );
};

export default PostedJobsError;
