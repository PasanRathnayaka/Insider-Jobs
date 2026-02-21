import { SOCKET } from "../utils/socketInstance";


export const useSocketConnection = () => {
    SOCKET.connect();

    SOCKET.on("connect", () => {
        console.log("connected: ", SOCKET.id);
    });

};

export const useSocketDisconnect = () => {
    SOCKET.disconnect();

    SOCKET.on("disconnect", (reason) => {
        console.log("disconnected: ", SOCKET.id, "reason: ", reason);
    });

};
