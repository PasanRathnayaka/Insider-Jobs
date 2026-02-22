import { useQueryClient } from "@tanstack/react-query";


const NotificationError = () => {

    const hndleRetry = () => {
        const queryClient = useQueryClient();

        queryClient.refetchQueries(["notifications"]);
    };


    return (
        <div className="flex flex-col items-center justify-center h-[300px] text-center">
            <div className="bg-red-50 text-red-600 px-6 py-4 rounded-xl shadow-sm">
                <h2 className="font-semibold text-lg mb-2">
                    Failed to load notifications
                </h2>
                <p className="text-sm mb-4">
                    Something went wrong
                </p>
                <button
                    onClick={hndleRetry}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                    Retry
                </button>
            </div>
        </div>
    );
};

export default NotificationError;