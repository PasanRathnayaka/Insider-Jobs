import cookie from "cookie";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AppError } from "../utils/AppError.js";

dotenv.config();


export const authenticateSocketUser = (io) => {
    io.use((socket, next) => {
        try {
            const rawCookies = socket.handshake.headers.cookie;

            if (!rawCookies) {
                return next(new AppError("No cookies. Failed to authenticate the socket user", 401));
            }

            const parsedCookies = cookie.parse(rawCookies);

            const token = parsedCookies.token;

            if (!token) {
                return next(new AppError("No token. Failed to authenticate the socket user", 401));
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            socket.user = decoded;

            console.log("Socket authenticated user:", decoded.id);

            next();

        } catch (error) {
            console.error("Socket auth failed:", error.message);
            next(new AppError("Failed to authenticate the socket user", 401));
        }
    });
};