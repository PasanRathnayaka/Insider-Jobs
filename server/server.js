import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { initializeSocket } from "./sockets/socket.js";
import { authenticateSocketUser } from "./sockets/socketAuth.js";
import { retryConnection } from "./utils/retryMongodbConnection.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Authorization"],
  },
});

authenticateSocketUser(io);

initializeSocket(io);

const startServer = async () => {
  try {
    await retryConnection(connectDB);

    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error);
    process.exit(1);
  }
};

startServer();
