import { toast } from "react-toastify";
import { SOCKET } from "../utils/socketInstance";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";


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

    const getUpdatedStatusNotification = useCallback(() => {
        const queryClient = useQueryClient();

        SOCKET.on("application:statusUpdated", (data) => {
            toast.info(data.message);

            queryClient.invalidateQueries(["applied-jobs"]);
        });
    }, []);


    return { useSocketConnection, useSocketDisconnect, getUpdatedStatusNotification };

};

