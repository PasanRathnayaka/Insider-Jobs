import { AlertTriangle, RefreshCcw } from "lucide-react";

const ViewApplicantsTableError = () => {

    const handleRetry = () => {
        window.location.reload();
    };


    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-red-100 p-6 rounded-full mb-6">
                <AlertTriangle size={40} className="text-red-500" />
            </div>

            <h2 className="text-xl font-semibold text-gray-800">
                Something went wrong
            </h2>

            <p className="text-gray-500 mt-2 max-w-md">
                We couldn't load the applications. Please try again.
            </p>

            <button
                onClick={handleRetry}
                className="mt-6 flex items-center gap-2 px-5 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-900 transition"
            >
                <RefreshCcw size={16} />
                Retry
            </button>
        </div>
    );
};

export default ViewApplicantsTableError;
