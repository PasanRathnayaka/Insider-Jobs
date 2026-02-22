import { registerNotificationEvents } from "./notificationSocket.js";


export const connectedUsers = new Map();

export const initializeSocket = (io) => {

    io.on("connect", (socket) => {
        console.log("Authenticated user connected:", socket.user.id);

        // joining a personal room
        if (socket.user?.id) {
            socket.join(`user:${socket.user.id}`);
            console.log(`User joined room: user:${socket.user.id}`);
        }

        socket.on("disconnect", (reason) => {
            connectedUsers.delete(socket.user.id);
            console.log("User disconnected:", socket.user.id, "Reason: ", reason);
        });
    });

    io.engine.on("connection_error", (error) => {
        console.error("Socket connection error:", error.message);
    });


    // registering domain listners
    registerNotificationEvents(io);
};
