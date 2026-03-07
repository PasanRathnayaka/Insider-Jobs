import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { getNotifications, markAllNotificationsAsRead, markNotificationAsRead } from "../../api/notification.api";
import { toast } from "react-toastify";


export const useNotification = () => {
    return useSuspenseQuery({
        queryKey: ["notifications"],
        queryFn: async () => {
            try {
                const data = await getNotifications();
                return data;

            } catch (error) {
                if (error?.response?.status === 404) {
                    return { data: { notifications: [] } };
                } else {
                    console.log("Error fetching notifications: ", error);
                    throw error;
                }
            }
        },

        suspense: true,
        staleTime: 1000 * 60,
        retry: 2,
    });
};

export const useMarkNotificationAsRead = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (notificationId) => {
            return await markNotificationAsRead(notificationId);
        },
        onMutate: async (notificationId) => {
            await queryClient.cancelQueries({ queryKey: ["notifications"] });

            const previousNotifications = queryClient.getQueryData(["notifications"]);

            queryClient.setQueryData(["notifications"], (old) => {
                return old?.data?.notifications?.map((notification) =>
                    notification._id === notificationId
                        ? { ...notification, isRead: true }
                        : notification
                ).filter((notification) => !notification.isRead);
            });

            return { previousNotifications };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        },
        onError: (error) => {
            toast.error("Error marking notification as read");
            console.error("Error marking notification as read", error);
        }
    });
};

export const useMarkAllNotificationsAsRead = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            return await markAllNotificationsAsRead();
        },
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: ["notifications"] });

            const previousNotifications = queryClient.getQueryData(["notifications"]);

            queryClient.setQueryData(["notifications"], (old) => {
                return old?.data?.notifications?.map((notification) => {
                    return {
                        ...notification,
                        isRead: true
                    }
                });
            });

            return { previousNotifications };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
            toast.success("All notifications marked as read");
        },
        onError: (error) => {
            console.error("Error marking all notifications as read", error);
            toast.error("Failed to mark all as read");
        }
    });
};