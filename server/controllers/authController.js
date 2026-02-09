import jwt from 'jsonwebtoken';
import bcrypt, { genSalt } from 'bcryptjs';
import { validationResult } from 'express-validator';
import { User } from '../models/User.js';
import { sendResponse } from '../utils/responseHandler.js';


//To register a new user
export const registerUser = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return sendResponse(res, 400, false, "Input Validation Error", null, errors.array());
    }


    try {
        const { username, email, password, role } = req.body;
        if (!username || !email || !password || !role) return sendResponse(res, 400, false, "All fields are required");

        const isExistingUser = await User.findOne({ email });
        if (isExistingUser) return sendResponse(res, 400, false, "user already exixts");

        const salt = await genSalt(10);
        const hashedPswd = await bcrypt.hash(String(password), salt);

        const user = new User(
            {
                username: username,
                email: email,
                password: hashedPswd,
                role: role
            }
        );

        const isRegistered = await user.save();
        if (!isRegistered) return sendResponse(res, 400, false, "Registered failed. Please try again");

        const registerdUser = await User.findOne({ email });
        if (!registerdUser) return sendResponse(res, 404, false, "User Not Found");

        const psw = await bcrypt.compare(password, registerdUser.password);
        if (!psw) return sendResponse(res, 400, false, "Incorrect Password");

        const token = jwt.sign({ id: registerdUser._id, role: registerdUser.role }, process.env.JWT_SECRET, { expiresIn: "30min" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
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
        return sendResponse(res, 500, false, "Internal server error while creating new user", null, error.message);
    }
};

//To login a user
export const loginUser = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) return sendResponse(res, 400, false, "Input Validation Error", null, errors.array());

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return sendResponse(res, 404, false, "User Not Found");

        const psw = await bcrypt.compare(password, user.password);
        if (!psw) return sendResponse(res, 400, false, "Incorrect Password");

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "30min" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
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

        const userData = {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            imageURL: user.imageURL,
        }

        return sendResponse(res, 200, true, "User Login Successfully", { user: userData });

    } catch (error) {
        return sendResponse(res, 500, false, "Server error while login the user", null, error.message);
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

