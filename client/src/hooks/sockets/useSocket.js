import { toast } from "react-toastify";
import { SOCKET } from "../../utils/socketInstance";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";


export const useSocket = () => {

    const useSocketConnection = useCallback(() => {
        SOCKET.connect();

        SOCKET.on("connect", () => {
            console.log("connected: ", SOCKET.id);
        });

    }, []);

    const useSocketDisconnect = useCallback(() => {
        SOCKET.disconnect();

        SOCKET.on("disconnect", (reason) => {
            console.log("disconnected: ", SOCKET.id, "reason: ", reason);
        });

    }, []);

    const useRealTimeListeners = () => {
        const queryClient = useQueryClient();

        useEffect(() => {
            // Specific event listener for job status changes (for quick updates on the applicant's AppliedJobs dashboard)
            SOCKET.on("application:statusUpdated", (data) => {
                toast.info(data.message);
                queryClient.invalidateQueries({ queryKey: ["applied-jobs"] });
                queryClient.invalidateQueries({ queryKey: ["notifications"] });
            });

            // DRY Global listener for all general notifications (e.g. Recruiter getting a new application)
            SOCKET.on("notification:new", (notification) => {
                toast.success(notification.title || "New Notification!");
                queryClient.invalidateQueries({ queryKey: ["notifications"] });
            });

            return () => {
                SOCKET.off("application:statusUpdated");
                SOCKET.off("notification:new");
            };
        }, [queryClient]);
    };

    return { useSocketConnection, useSocketDisconnect, useRealTimeListeners };
};

