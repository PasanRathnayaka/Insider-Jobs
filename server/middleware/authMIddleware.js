import jwt from 'jsonwebtoken';
import { sendResponse } from '../utils/responseHandler.js';

export const authMiddleware = {

    //To verify authorization
    checkAuthorization: (req, res, next) => {
        const { token } = req.body;

        if (!token) {
            // return res.status(401).json({ message: "No token. Authenticaton failed" });
            return sendResponse(res, 401, false, "No token. Authorization failed");
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            return next();

        } catch (error) {
            // return res.status(401).json({ Error: "Token is not valid!" });
            return sendResponse(res, 401, false, "Server error while check authorization", null, error.message);
        }
    },

    //To verify token
    verifyToken: (req, res, next) => {
        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith("Bearer")) {
           return sendResponse(res, 401, false, "No token provided with request");
        }

        const token = authHeader && authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();

        } catch (error) {
            return sendResponse(res, 401, false, "Invalid Token", null, error.message);
        }
    },

    //To veirfy user role
    verifyUserRole: (req, res, next) => {

        const user = req.user;
        const user_role = user.role;
        const allowedUserRoles = ["recruiter","admin"];

        if(!user_role) return sendResponse(res, 400, false, "No User Role Defined");

        if(!allowedUserRoles.includes(user_role)) return sendResponse(res, 403, false, "Forbidden, Permisson Denied");

        req.user = user;
        next();
    }
} 