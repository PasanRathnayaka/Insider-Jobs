import { useNotification } from "../../hooks/notifications/useNotifications";
import NotificationCard from "./NotificationCard";
import NotificationsEmpty from "./NotificationsEmpty";



const NotificationList = () => {

    const { data } = useNotification();

    const handleMarkNotificationAsRead = () => { };

    return (
        data?.data?.notifications?.length === 0 ? (
            <NotificationsEmpty />
        ) : (
            < div className="space-y-4" >
                {data?.data?.notifications?.map((notification) => (
                    <NotificationCard
                        key={notification._id}
                        notification={notification}
                        onRead={handleMarkNotificationAsRead}
                    />
                ))}
            </div >
        )
    );
};

export default NotificationList;