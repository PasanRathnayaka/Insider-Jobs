
const MoreJobsError = () => {

    const handleRetry = () => {
        window.location.reload();
    };



    return (
        <div className="mt-6 p-4 border border-red-200 bg-red-50 rounded">
            <p className="text-red-600 text-sm">
                Failed to load more jobs.
            </p>

            <button
                onClick={handleRetry}
                className="mt-3 px-4 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-700"
            >
                Retry
            </button>
        </div>
    );
};

export default MoreJobsError;
