const SkeletonCell = ({ className = "" }) => (
    <div
        className={`h-4 rounded bg-gray-200 animate-pulse ${className}`}
    />
);

const ManageJobsTableSkeleton = ({ rows = 6 }) => {
    return (
        <div className="overflow-x-auto">
            <table className="table-auto min-w-full text-md text-left">
                <thead>
                    <tr className="border border-gray-300">
                        <th className="p-3">
                            <SkeletonCell className="w-18" />
                        </th>
                        <th className="p-3">
                            <SkeletonCell className="w-18" />
                        </th>
                        <th className="p-3">
                            <SkeletonCell className="w-18" />
                        </th>
                        <th className="p-3">
                            <SkeletonCell className="w-18" />
                        </th>
                        <th className="p-3">
                            <SkeletonCell className="w-18" />
                        </th>
                        <th className="p-3">
                            <SkeletonCell className="w-18" />
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {Array.from({ length: rows }).map((_, index) => (
                        <tr
                            key={index}
                            className="border border-gray-300"
                        >
                            <td className="p-3">
                                <SkeletonCell className="w-24" />
                            </td>

                            <td className="p-3">
                                <SkeletonCell className="w-40" />
                            </td>

                            <td className="p-3">
                                <SkeletonCell className="w-24" />
                            </td>

                            <td className="p-3">
                                <SkeletonCell className="w-32" />
                            </td>

                            <td className="p-3">
                                <SkeletonCell className="w-16" />
                            </td>

                            <td className="p-3">
                                <div className="pl-5 flex items-center">
                                    <div className="h-5 w-5 rounded-full bg-gray-200 animate-pulse" />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageJobsTableSkeleton;
