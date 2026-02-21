import { io } from "socket.io-client";

export const SOCKET = io("http://localhost:5000", {
    withCredentials: true,
    autoConnect: false,
});