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

    //To get a profile data
    export const getProfileData = async (req, res) => {
        const authorizedUser = req.user;

        try {
            const user = await User.findById(authorizedUser.id);

            // return res.status(200).json({
            //     message: "user profile data",
            //     profileData: {
            //         username: user.username,
            //         email: user.email
            //     }
            // })

            const profileData = {
                username: user.username,
                email: user.email
            }

            return sendResponse(res, 200, true, "User Profile Data", { profileData: profileData });

        } catch (error) {
            // res.status(500).json("server error");
            return sendResponse(res, 500, false, "Serveer error while getting profile data", null, error.message);
        }
    };

    //To update a profile data
    export const updateProfile = async (req, res) => {
        const user = req.user;
        // if (!user) return res.status(404).json({ message: "user not found" });
        if (!user) return sendResponse(res, 404, false, "User Not Found");

        const errors = validationResult(req);
        // if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        if (!errors.isEmpty()) return sendResponse(res, 400, false, "Input Validation Error", null, errors.array());

        const { username } = req.body;

        try {
            await User.findByIdAndUpdate(user.id, { username: username });

            const updatedUser = await User.findById(user.id);

            // return res.status(200).json({
            //     message: "profile updated",
            //     data: {
            //         updatedUser
            //     }
            // })

            return sendResponse(res, 200, true, "Profile Updated", { updatedProfile: updatedUser });

        } catch (error) {
            // res.status(500).json("Server error");
            return sendResponse(res, 500, false, "Server error while updating the user profile", null, error.message);
        }
    };

    //To delete a profile data
    export const deleteProfile = async (req, res) => {

        const user = req.user;
        // if (!user) return res.status(404).json({ message: "user not found" });
        if (!user) return sendResponse(res, 404, false, "User Not Found");

        try {
            const result = await User.findByIdAndDelete(user.id);

            if (result) {
                // return res.status(200).json({
                //     message: "user profile deleted successfully",
                // })

                return sendResponse(res, 200, true, "User Profile Deleted Successfully");
            }

        } catch (error) {
            // res.status(500).json({ message: "server error" });
            return sendResponse(res, 500, false, "Server error while deleting the profile", null, error.message);
        }
    };

    //To change password
    export const changePassword = async (req, res) => {

        const user = req.user;
        // if (!user) return res.status(404).json({ message: "user not found" });
        if (!user) return sendResponse(res, 404, false, "User Not Found");

        const errors = validationResult(req);
        // if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        if (!errors.isEmpty()) return sendResponse(res, 400, false, "Input Validation Error", null, errors.array());

        const { password } = req.body;

        try {
            const hashedPswd = await bcrypt.hash(password, 10);
            const result = await User.findByIdAndUpdate(user.id, { password: hashedPswd });

            // const updatedUser = await User.findById(user.id);

            // return res.status(200).json({
            //     message: "password updated successfully",
            //     user: result
            // });

            if (result) {
                return sendResponse(res, 200, true, "Passowrd Updated Successfully");
            }

        } catch (error) {
            return sendResponse(res, 500, false, "Server error while updating password", null, error.message);
        }

    };

    //To update profile picture
    export const updateProfilePicture = async (req, res) => {

       const user_id = req.user._id;

        const profileStorage = multer.diskStorage({
            destination: function (req, res, cb) {
                cb(null, path.resolve("uploads/profiles"));
            },
            filename: function(req, file, cb){
                const fileExtension = path.extname(file.originalname);

                cb(null, `user-${user_id}-${Date.now()}${fileExtension}`);
            }
        });

        const profileFileFilter = (req, file, cb) => {_
            if(file.mimetype.startsWith("image/")){
                cb(null, true);
            }
            else{
                cb(new Error("Only image files are allowed for profile pictures."), false);
            }
        };

        const uploadProfile = multer({
            storage: profileStorage,
            fileFilter: profileFileFilter,
            limits: {
                fileSize: 1024 * 1024 * 2
            }
        });
    };