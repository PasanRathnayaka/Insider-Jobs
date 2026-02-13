const SkeletonRow = () => (
    <tr className="border border-gray-300 animate-pulse">
        <td className="p-3">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-300 rounded" />
                <div className="h-4 w-32 bg-gray-300 rounded" />
            </div>
        </td>

        <td className="p-3">
            <div className="h-4 w-40 bg-gray-300 rounded" />
        </td>

        <td className="p-3">
            <div className="h-4 w-28 bg-gray-300 rounded" />
        </td>

        <td className="p-3">
            <div className="h-4 w-24 bg-gray-300 rounded" />
        </td>

        <td className="p-3">
            <div className="h-6 w-24 bg-gray-300 rounded-full mx-auto" />
        </td>
    </tr>
);

const AppliedJobsTableSkeleton = () => {
    return (
        <div className="overflow-x-auto">
            <table className="table-auto min-w-full text-md text-left">
                <thead>
                    <tr className="border border-gray-300">
                        <th className="p-3">Company</th>
                        <th className="p-3">Job Title</th>
                        <th className="p-3">Location</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <SkeletonRow key={index} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AppliedJobsTableSkeleton;
