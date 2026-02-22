import { formatDistanceToNow } from "date-fns";

const NotificationCard = ({ notification, onRead }) => {
    return (
        <div
            className={`p-4 rounded-2xl shadow-sm border transition-all duration-200 hover:shadow-md 
                ${notification.read
                    ? "bg-white border-gray-200"
                    : "bg-blue-50 border-blue-200"
                }`}
                onClick={() => !notification.read && onRead(notification._id)}
        >
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-sm font-semibold text-gray-800">
                        {notification.title}
                    </h3>

                    <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                    </p>

                    <span className="text-xs text-gray-400 mt-2 block">
                        {formatDistanceToNow(new Date(notification.createdAt), {
                            addSuffix: true,
                        })}
                    </span>
                </div>

                {!notification.read && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-1" />
                )}
            </div>
        </div>
    );
};

export default NotificationCard;