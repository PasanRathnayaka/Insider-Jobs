import API from "../utils/axiosInstace";


export const getNotifications = async () => {
    const res = await API.get("/notifications");
    return res.data;
};

export const markNotificationAsRead = async (notificationId) => {
    const res = await API.patch(`/notifications/${notificationId}/read`);
    return res.data;
};

export const markAllNotificationsAsRead = async () => {
    const res = await API.patch("/notifications/read-all");
    return res.data;
};