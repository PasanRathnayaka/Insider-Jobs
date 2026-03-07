import { Suspense } from 'react';
import { useNotification } from '../../hooks/notifications/useNotifications';

const Badge = () => {
    const { data } = useNotification();
    const notifications = Array.isArray(data) ? data : data?.data?.notifications || [];

    const unreadCount = notifications.length;

    if (unreadCount === 0) return null;

    return (
        <span className="absolute top-1 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white animate-in zoom-in">
            {unreadCount > 9 ? '9+' : unreadCount}
        </span>
    );
};

const NotificationBadge = () => {
    return (
        <Suspense fallback={null}>
            <Badge />
        </Suspense>
    );
};

export default NotificationBadge;
