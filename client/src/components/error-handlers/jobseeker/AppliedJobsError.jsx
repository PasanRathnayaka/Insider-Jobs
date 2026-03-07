import { AlertTriangle } from "lucide-react";

const AppliedJobsError = () => {

    const handleRetry = () => {
        window.location.reload();
    };

    return (
        <div className="border border-red-200 bg-red-50 rounded-lg p-6 flex flex-col items-center text-center gap-4">
            <AlertTriangle className="w-10 h-10 text-red-500" />

            <h2 className="text-lg font-semibold text-red-600">
                Failed to load applications
            </h2>

            <p className="text-sm text-gray-600 max-w-md">
                Something went wrong while fetching your applied jobs.
                Please try again.
            </p>

            <button
                onClick={handleRetry}
                className="mt-2 px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
                Retry
            </button>
        </div>
    );
};

export default AppliedJobsError;
