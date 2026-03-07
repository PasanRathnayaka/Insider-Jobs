import { validationResult } from 'express-validator';
import { sendResponse } from '../utils/responseHandler.js';
import * as authService from '../services/authService.js';


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

        const { user, token } = await authService.registerUser(username, email, password, role);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 30,
            sameSite: "strict",
        });

        res.cookie("loggedIn", "true", {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 30
        });

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
        const { user: userData, token } = await authService.loginUser(email, password);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 30,
            sameSite: "strict",
        });

        res.cookie("loggedIn", "true", {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 30
        });

        return sendResponse(res, 200, true, "User Login Successfully", { user: userData });

    } catch (error) {
        return sendResponse(res, error.statusCode || 500, false, error.message || "Server error while login the user", null, error.stack);
    }
};

//Logout users
export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token", {
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


