import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import http from "http";
import { Server } from 'socket.io';
import app from './app.js';
import { initializeSocket } from './sockets/socket.js';


dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

export const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        allowedHeaders: ['Authorization'],
    }
});

initializeSocket(io);


connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});

