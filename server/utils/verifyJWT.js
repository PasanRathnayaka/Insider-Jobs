import { AppError } from "../utils/AppError.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const verifyJWT = (authHeader, token) => {

    if ((!authHeader || !authHeader.startsWith("Bearer")) && !token) {
        throw new AppError("No token provided with the request", 401);
    }

    const jwToken = (authHeader && authHeader.split(' ')[1]) || token;

    const decoded = jwt.verify(jwToken, JWT_SECRET);

    if (!decoded) {
        throw new AppError("Inavlid or expired token", 401);
    }

    return { decoded };
};