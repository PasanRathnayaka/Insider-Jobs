import { Suspense, useRef, useEffect } from "react";
import { useNotification, useMarkNotificationAsRead, useMarkAllNotificationsAsRead } from "../../hooks/notifications/useNotifications";
import NotificationCard from "./NotificationCard";
import NotificationsEmpty from "./NotificationsEmpty";
import NotificationSkeleton from "../skeletons/notification/NotificationSkeleton";
import ErrorBoundary from "../ErrorBoundary";
import NotificationError from "../error-handlers/notification/NotificationError";
import { Check, X } from "lucide-react";

const NotificationPopupList = ({ onClose }) => {
    const { data } = useNotification();
    const markAsReadMutation = useMarkNotificationAsRead();
    const markAllAsReadMutation = useMarkAllNotificationsAsRead();

    const notifications = Array.isArray(data) ? data : data?.data?.notifications || [];

    const handleMarkNotificationAsRead = (id) => {
        markAsReadMutation.mutate(id);
    };

    const handleMarkAllAsRead = () => {
        markAllAsReadMutation.mutate();
    };

    return (
        <div className="flex flex-col h-full bg-white relative">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white/90 backdrop-blur z-10">
                <div>
                    <h3 className="text-lg font-bold text-gray-800">Notifications</h3>
                    <p className="text-xs text-gray-500">Stay updated with real-time activity.</p>
                </div>
                <button
                    onClick={onClose}
                    className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                    <X size={20} />
                </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar min-h-60 max-h-96">
                {notifications.length === 0 ? (
                    <NotificationsEmpty />
                ) : (
                    notifications.map((notification) => (
                        <NotificationCard
                            key={notification._id}
                            notification={notification}
                            onRead={handleMarkNotificationAsRead}
                        />
                    ))
                )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && notifications.some(n => !n.read) && (
                <div className="p-3 border-t border-gray-100 sticky bottom-0 bg-white z-10">
                    <button
                        onClick={handleMarkAllAsRead}
                        disabled={markAllAsReadMutation.isPending}
                        className="w-full py-2.5 px-4 bg-gray-50 hover:bg-blue-50 text-blue-600 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 group border border-transparent hover:border-blue-100 cursor-pointer"
                    >
                        {markAllAsReadMutation.isPending ? (
                            "Marking..."
                        ) : (
                            <>
                                <Check size={16} className="text-blue-500 group-hover:scale-110 transition-transform" />
                                Mark All as Read
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

const NotificationPopupWrapper = ({ isOpen, onClose }) => {
    const popupRef = useRef(null);

    // Handle outside clicks
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleOutsideClick);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.body.style.overflow = "auto";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            ref={popupRef}
            className="absolute top-12 right-0 md:right-16 w-[350px] sm:w-[400px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 overflow-hidden transform origin-top-right transition-all animate-in fade-in zoom-in-95 duration-200 z-50"
        >
            <ErrorBoundary FallbackComponent={<NotificationError />}>
                <Suspense fallback={
                    <div className="p-4 space-y-4 min-h-60">
                        {/* Header skeleton */}
                        <div className="flex justify-between items-center mb-6">
                            <div className="space-y-2">
                                <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-3 w-40 bg-gray-100 rounded animate-pulse"></div>
                            </div>
                        </div>
                        <NotificationSkeleton />
                    </div>
                }>
                    <NotificationPopupList onClose={onClose} />
                </Suspense>
            </ErrorBoundary>
        </div>
    );
};

export default NotificationPopupWrapper;
