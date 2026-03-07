import { BellOff } from "lucide-react";

const NotificationsEmpty = () => {

    return (
        <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-gray-50 rounded-2xl border border-gray-100">

            <div className="bg-gray-100 p-4 rounded-full mb-4">
                <BellOff className="w-8 h-8 text-gray-400" />
            </div>

            <h3 className="text-lg font-semibold text-gray-700">
                No notifications yet
            </h3>

            <p className="text-sm text-gray-500 mt-2 max-w-md">
                When you receive updates about applications, job status changes,
                or system activities, they will appear here.
            </p>
        </div>
    );
};

export default NotificationsEmpty;