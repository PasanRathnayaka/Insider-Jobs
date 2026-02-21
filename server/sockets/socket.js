

export const connectedUsers = new Map();

export const initializeSocket = (io) => {

    io.on("connect", (socket) => {
        console.log("Authenticated user connected:", socket.user.id);

        connectedUsers.set(socket.user.id, socket.id);

        console.log("User registered:", connectedUsers.get(socket.user.id));

        socket.on("disconnect", (reason) => {
            connectedUsers.delete(socket.user.id);
            console.log("User disconnected:", socket.user.id, "Reason: ", reason);
        });
    });

    io.engine.on("connection_error", (error) => {
        console.error("Socket connection error:", error.message);
    });
};
