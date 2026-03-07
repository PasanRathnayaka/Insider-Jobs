import { formatDistanceToNow } from "date-fns";
import { Check } from "lucide-react";

const NotificationCard = ({ notification, onRead }) => {
    return (
        <div
            className={`p-4 rounded-2xl shadow-sm border transition-all duration-200 hover:shadow-md 
                ${notification.isRead
                    ? "bg-white border-gray-200"
                    : "bg-blue-50 border-blue-200"
                }`}
        >
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-sm font-semibold text-gray-800">
                        {notification.title}
                    </h3>

                    <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                    </p>

                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400 mt-2 block">
                            {formatDistanceToNow(new Date(notification.createdAt), {
                                addSuffix: true,
                            })}
                        </span>

                        <button
                            onClick={() => !notification.isRead && onRead(notification._id)}
                            className="py-1 px-2 bg-white text-blue-600 rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-2 group border border-blue-200 hover:border-blue-300 cursor-pointer"
                        >
                            <Check size={16} className="text-blue-500 group-hover:scale-110 transition-transform" />
                            Mark as Read
                        </button>
                    </div>

                </div>

                {!notification.isRead && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-1" />
                )}
            </div>
        </div>
    );
};

export default NotificationCard;