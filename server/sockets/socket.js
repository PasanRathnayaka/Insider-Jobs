
export const connectedUsers = new Map();

export const initializeSocket = (io) => {
    console.log("Socket.IO initialized");

    io.on("connect", (socket) => {
        console.log("🔌 User connected:", socket.id);

        socket.on("register", (userId) => {
            connectedUsers.set(userId, socket.id);
            console.log("User registered:", userId);
        });

        socket.on("disconnect", () => {
            for (let [userId, socketId] of connectedUsers) {
                if (socketId === socket.id) {
                    connectedUsers.delete(userId);
                    break;
                }
            }
            console.log("User disconnected:", socket.id);
        });
    });

    io.engine.on("connection_error", (error) => {
        console.error("Socket connection error:", error);
    });

};
