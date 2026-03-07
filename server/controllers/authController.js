import { validationResult } from 'express-validator';
import { sendResponse } from '../utils/responseHandler.js';
import * as authService from '../services/authService.js';


const setCookies = (res, accessToken, refreshToken) => {
    // Access token for short-lived authorization
    res.cookie("token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 15,
        sameSite: "strict",
    });

    // Refresh token for long-lived session persistence
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: "strict",
    });

    res.cookie("loggedIn", "true", {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7
    });
};


//To register a new user
export const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return sendResponse(res, 400, false, "Input Validation Error", null, errors.array());
    }

    try {
        const { username, email, password, role } = req.body;
        if (!username || !email || !password || !role) {
            return sendResponse(res, 400, false, "All fields are required");
        }

        const { user, accessToken, refreshToken } = await authService.registerUser(username, email, password, role);

        setCookies(res, accessToken, refreshToken);

        return sendResponse(res, 201, true, "user created successfully");

    } catch (error) {
        return sendResponse(res, error.statusCode || 500, false, error.message || "Internal server error while creating new user", null, error.stack);
    }
};

//To login a user
export const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return sendResponse(res, 400, false, "Input Validation Error", null, errors.array());
    }

    const { email, password } = req.body;

    try {
        const { user: userData, accessToken, refreshToken } = await authService.loginUser(email, password);

        setCookies(res, accessToken, refreshToken);

        return sendResponse(res, 200, true, "User Login Successfully", { user: userData });

    } catch (error) {
        return sendResponse(res, error.statusCode || 500, false, error.message || "Server error while login the user", null, error.stack);
    }
};

// Refresh access token to maintain the session
export const refreshToken = async (req, res) => {
    try {
        const oldRefreshToken = req.cookies.refreshToken;
        if (!oldRefreshToken) {
            return sendResponse(res, 401, false, "Unauthorized. Please log in again");
        }

        const { accessToken } = await authService.refreshAccessToken(oldRefreshToken);

        res.cookie("token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 15,
            sameSite: "strict",
        });

        return sendResponse(res, 200, true, "Session refreshed successfully");
    } catch (error) {
        res.clearCookie("token");
        res.clearCookie("refreshToken");
        res.clearCookie("loggedIn");
        return sendResponse(res, error.statusCode || 401, false, error.message || "Session expired. Please log in again");
    }
};

//Logout users and explicitly clear session from the database
export const logoutUser = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;

        await authService.logoutUser(refreshToken);

        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            expires: new Date(0)
        });

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            expires: new Date(0)
        });

        res.clearCookie("loggedIn");

        return sendResponse(res, 200, true, "Logged out successfully");

    } catch (error) {
        return sendResponse(res, 500, false, "Internal Server Error", null, error.message);
    }
};

