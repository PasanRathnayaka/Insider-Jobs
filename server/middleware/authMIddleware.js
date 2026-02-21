// import jwt from 'jsonwebtoken';
import { sendResponse } from '../utils/responseHandler.js';
import { verifyJWT } from '../utils/verifyJWT.js';


//To verify token
export const authenticateUser = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const { token } = req.cookies;

        const { decoded } = verifyJWT(authHeader, token);
        req.user = decoded;
        next();

    } catch (error) {
        return sendResponse(res, 401, false, "Invalid Token", null, error.message);
    }
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


