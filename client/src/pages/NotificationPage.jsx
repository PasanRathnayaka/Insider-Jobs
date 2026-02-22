import { Suspense } from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import NotificationSkeleton from "../components/skeletons/notification/NotificationSkeleton";
import NotificationList from "../components/notifications/NotificationList";
import NotificationError from "../components/error-handlers/notification/NotificationError";


const NotificationsPage = () => {
    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Notifications
                </h1>
                <p className="text-sm text-gray-500">
                    Stay updated with real-time activity.
                </p>
            </div>

            <div>
                <ErrorBoundary FallbackComponent={NotificationError}>
                    <Suspense fallback={<NotificationSkeleton />}>
                        <NotificationList />
                    </Suspense>
                </ErrorBoundary>
            </div>
        </div>
    );
};

export default NotificationsPage;