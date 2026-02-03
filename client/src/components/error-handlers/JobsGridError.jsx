

const JobsGridError = ({ onRetry }) => {
    return (
        <div className="w-full h-80 flex flex-col items-center justify-center gap-4">
            <h2 className="text-lg font-semibold text-gray-700">
                Failed to load jobs
            </h2>

            <p className="text-sm text-gray-500">
                Something went wrong while fetching job listings.
            </p>

            <button
                onClick={onRetry}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
            >
                Try again
            </button>
        </div>
    );
};

export default JobsGridError;
