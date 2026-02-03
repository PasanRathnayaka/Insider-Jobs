
const JobsGridSkeleton = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 -z-10">
            {Array.from({ length: 9 }).map((_, index) => (
                <div
                    key={index}
                    className="flex flex-col justify-between px-3 py-5 rounded shadow animate-pulse"
                >
                    {/* Header */}
                    <div>
                        <div className="size-10 rounded-full bg-gray-300" />

                        <div className="h-5 w-3/4 bg-gray-300 rounded mt-4" />

                        <div className="flex items-center gap-3 my-3">
                            <div className="h-6 w-20 bg-gray-200 rounded" />
                            <div className="h-6 w-20 bg-gray-200 rounded" />
                        </div>
                    </div>

                    {/* Body */}
                    <div className="space-y-2 mt-4">
                        <div className="h-4 bg-gray-200 rounded w-full" />
                        <div className="h-4 bg-gray-200 rounded w-5/6" />
                        <div className="h-4 bg-gray-200 rounded w-4/6" />
                    </div>

                    {/* Footer */}
                    <div className="flex items-center gap-3 mt-6">
                        <div className="h-8 w-24 bg-gray-300 rounded" />
                        <div className="h-8 w-28 bg-gray-200 rounded" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default JobsGridSkeleton;