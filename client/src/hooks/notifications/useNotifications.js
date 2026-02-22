import { useSuspenseQuery } from "@tanstack/react-query";
import { getNotifications } from "../../api/notification.api";


export const useNotification = () => {
    return useSuspenseQuery({
        queryKey: ["notifications"],
        queryFn: async () => {
            try {
                const data = await getNotifications();
                return data;
                
            } catch (error) {
                if (error?.response?.status === 404) {
                    return [];
                } else {
                    console.log("Error fetching notifications: ", error);
                }
            }
        },

        suspense: true,
        staleTime: 1000 * 60,
        retry: 2,
    });
};