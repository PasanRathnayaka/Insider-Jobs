

const JobsGridError = () => {

    const handleReload = () => {
        window.location.reload();
    };

    return (
        <div className="w-full h-80 flex flex-col items-center justify-center gap-4">
            <h2 className="text-lg font-semibold text-gray-700">
                Failed to load jobs
            </h2>

            <p className="text-sm text-gray-500">
                Something went wrong while fetching job listings.
            </p>

            <button
                onClick={handleReload}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
            >
                Reload
            </button>
        </div>
    );
};

export default JobsGridError;
