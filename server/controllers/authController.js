import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import { User } from '../models/User.js';
import { sendResponse } from '../utils/responseHandler.js';
import multer from 'multer';
import path from 'path';


    //To register a new user
    export const registerUser = async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // return res.status(400).json({ errors: errors.array() });
            return sendResponse(res, 400, false, "Input Validation Error", null, errors.array());
        }

        const { username, email, password, role } = req.body;

        try {
            let user = await User.findOne({ email });
            // if (user) return res.status(400).json({ message: "User Already Exist" });
            if (user) return sendResponse(res, 400, false, "user already exixts");

            const hashedPswd = await bcrypt.hash(password, 10);

            user = new User({ username, email, password: hashedPswd, role });

            await user.save();

            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "15min" });

            // return res.status(201).json({
            //     message: "user created successfully",
            //     token: token
            // });

            return sendResponse(res, 201, true, "user created successfully", { token: token });

        } catch (error) {
            return sendResponse(res, 500, false, "server error while creating new user", null, error.message);
        }
    };

    //To login a user
    export const loginUser = async (req, res) => {

        const errors = validationResult(req);
        // if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        if (!errors.isEmpty()) return sendResponse(res, 400, false, "Input Validation Error", null, errors.array());

        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            // if (!user) return res.status(404).json({ message: "User Not Found" });
            if (!user) return sendResponse(res, 404, false, "User Not Found");

            const psw = await bcrypt.compare(password, user.password);
            // if (!psw) return res.status(400).json({ message: "Invalid password" });
            if (!psw) return sendResponse(res, 400, false, "Incorrect Password");

            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "20min" });

            return sendResponse(res, 200, true, "User Login Successfully", { token: token });

        } catch (error) {
            // return res.status(500).json("Server Error");
            return sendResponse(res, 500, false, "Server error while login the user", null, error.message);
        }
    };
