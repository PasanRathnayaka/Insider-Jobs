
const ApplicantsTableSkeleton = () => {
    const rows = Array.from({ length: 6 });

    return (
        <div className="overflow-x-auto animate-pulse">
            <table className="table-auto min-w-full max-md:text-sm text-left">
                <thead>
                    <tr className="border border-gray-200">
                        {["#", "User Name", "Job Title", "Location", "Resume", "Action"].map(
                            (header, index) => (
                                <th key={index} className="p-3 text-gray-400 font-medium">
                                    {header}
                                </th>
                            )
                        )}
                    </tr>
                </thead>

                <tbody>
                    {rows.map((_, index) => (
                        <tr
                            key={index}
                            className="border border-gray-200 text-gray-400"
                        >
                            <td className="p-3">
                                <div className="h-4 w-24 bg-gray-200 rounded" />
                            </td>

                            <td className="p-3">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-gray-200" />
                                    <div className="h-4 w-32 bg-gray-200 rounded" />
                                </div>
                            </td>

                            <td className="p-3">
                                <div className="h-4 w-28 bg-gray-200 rounded" />
                            </td>

                            <td className="p-3">
                                <div className="h-4 w-24 bg-gray-200 rounded" />
                            </td>

                            <td className="p-3">
                                <div className="h-8 w-24 bg-gray-200 rounded-md" />
                            </td>

                            <td className="p-3">
                                <div className="h-6 w-6 bg-gray-200 rounded-full" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApplicantsTableSkeleton;
