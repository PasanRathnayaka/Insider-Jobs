const NotificationSkeleton = () => {
    return (
        <div className="space-y-4 animate-pulse">
            {Array.from({ length: 6 }).map((_, index) => (
                <div
                    key={index}
                    className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-sm"
                >
                    <div className="w-10 h-10 rounded-full bg-gray-200" />

                    <div className="flex-1 space-y-2">
                        <div className="h-3 w-1/3 bg-gray-200 rounded" />
                        <div className="h-3 w-2/3 bg-gray-200 rounded" />
                        <div className="h-2 w-1/4 bg-gray-200 rounded" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NotificationSkeleton;