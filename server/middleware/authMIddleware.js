import jwt from 'jsonwebtoken';
import { sendResponse } from '../utils/responseHandler.js';

//To verify token
export const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const { token } = req.cookies;

        if ((!authHeader || !authHeader.startsWith("Bearer")) && !token) {
            return sendResponse(res, 401, false, "No token provided with request");
        }

        const jwToken = (authHeader && authHeader.split(' ')[1]) || token;

        const decoded = jwt.verify(jwToken, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (error) {
        return sendResponse(res, 401, false, "Invalid Token", null, error.message);
    }
};

//To veirfy user role
export const checkAuthorization = (req, res, next) => {

    const user = req.user;
    const user_role = user.role;
    const allowedUserRoles = ["recruiter", "admin"];

    if (!user_role) return sendResponse(res, 400, false, "No User Role Defined");

    if (!allowedUserRoles.includes(user_role)) return sendResponse(res, 403, false, "Forbidden. Permisson Denied");

    req.user = user;
    next();
};

// To verify the authorization of jobseeker
export const authorizeJobseeker = (req, res, next) => {
    try {
        if (!req.user) {
            return sendResponse(res, 401, false, "Authentication required");
        }

        if (req.user.role !== "jobseeker") {
            return sendResponse(res, 403, false, "Access denied. Jobseeker role required");
        }
        next();

    } catch (error) {
        return sendResponse(res, 500, false, "Authorization failed");
    }
};

// To verify the authorization of recruiter
export const authorizeRecruiter = (req, res, next) => {
    try {
        if (!req.user) {
            return sendResponse(res, 401, false, "Authentication required");
        }

        if (req.user.role !== "recruiter") {
            return sendResponse(res, 403, false, "Access denied. Recruiter role required");
        }

        next();
    } catch (error) {
        return sendResponse(res, 500, false, "Authorization failed");
    }
};


