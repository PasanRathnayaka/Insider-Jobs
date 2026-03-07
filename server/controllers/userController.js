import multer from 'multer';
import path from 'path';
import { validationResult } from 'express-validator';
import { sendResponse } from '../utils/responseHandler.js';
import * as userService from '../services/userService.js';


const profileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.resolve('uploads/profiles');
        console.log(`[BACKEND LOG] Destination path for Multer: ${uploadPath}`);
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        const newFilename = `temp-upload-${uniqueSuffix}${fileExtension}`;
        console.log(`[BACKEND LOG] Generated filename for Multer: ${newFilename}`);
        cb(null, newFilename);
    }
});

const profileFileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        console.log(`[BACKEND LOG] File type acceptable: ${file.mimetype}`);
        cb(null, true);
    } else {
        console.log(`[BACKEND LOG] File type rejected: ${file.mimetype}`);
        cb(new Error('Only image files are allowed!'), false);
    }
};

export const uploadProfileImageMiddleware = multer({
    storage: profileStorage,
    fileFilter: profileFileFilter,
    limits: {
        fileSize: 1024 * 1024 * 2
    }
}).single('profileImage');


export const verifyProfilePictureUpload = async (req, res) => {
    try {
        if (!req.file) {
            console.log(`[BACKEND LOG] Upload failed: No file received or file type not allowed.`);
            return sendResponse(res, 400, false, 'No image uploaded or invalid file type detected by Multer.');
        }

        console.log(`[BACKEND LOG] File successfully received and saved to: ${req.file.path}`);

        return sendResponse(res, 200, true, 'Profile picture successfully received and saved!', {
            fileName: req.file.filename,
            fileSize: req.file.size,
            fileType: req.file.mimetype,
            fileUrl: `/uploads/profiles/${req.file.filename}`
        });

    } catch (error) {
        console.error(`[BACKEND LOG] Error in verifyProfilePictureUpload: ${error.message}`);
        return sendResponse(res, 500, false, 'Server error during file processing.');
    }
};


//To get a profile data
export const getProfileData = async (req, res) => {
    const userId = req.user.id;

    try {
        const userData = await userService.getProfileData(userId);
        return sendResponse(res, 200, true, "User Profile Data", { user: userData });

    } catch (error) {
        return sendResponse(res, error.statusCode || 500, false, "Server error while getting profile data", null, error.message);
    }
};


//To update a profile data
export const updateProfile = async (req, res) => {
    const userId = req.user.id;
    if (!userId) return sendResponse(res, 404, false, "User Not Found");

    const errors = validationResult(req);
    if (!errors.isEmpty()) return sendResponse(res, 400, false, "Input Validation Error", null, errors.array());

    const { username } = req.body;

    try {
        const updatedUser = await userService.updateProfile(userId, username);
        return sendResponse(res, 200, true, "Profile Updated", { updatedProfile: updatedUser });

    } catch (error) {
        return sendResponse(res, error.statusCode || 500, false, "Server error while updating the user profile", null, error.message);
    }
};

//To delete a profile data
export const deleteProfile = async (req, res) => {

    const userId = req.user.id;
    if (!userId) return sendResponse(res, 404, false, "User Not Found");

    try {
        await userService.deleteProfile(userId);
        return sendResponse(res, 200, true, "User Profile Deleted Successfully");

    } catch (error) {
        return sendResponse(res, error.statusCode || 500, false, "Server error while deleting the profile", null, error.message);
    }
};

//To change password
export const changePassword = async (req, res) => {

    const userId = req.user.id;
    if (!userId) return sendResponse(res, 404, false, "User Not Found");

    const errors = validationResult(req);
    if (!errors.isEmpty()) return sendResponse(res, 400, false, "Input Validation Error", null, errors.array());

    const { password } = req.body;

    try {
        await userService.changePassword(userId, password);
        return sendResponse(res, 200, true, "Passowrd Updated Successfully");

    } catch (error) {
        return sendResponse(res, error.statusCode || 500, false, "Server error while updating password", null, error.message);
    }

};

//To update profile picture
export const updateProfilePicture = async (req, res) => {
    const userId = req.user.id;
    const { imageURL } = req.body;

    if (!imageURL) {
        return sendResponse(res, 400, false, "Image URL is required");
    }

    try {
        const updatedUser = await userService.updateProfileImage(userId, imageURL);
        return sendResponse(res, 200, true, "Profile Picture Updated", { user: updatedUser });

    } catch (error) {
        return sendResponse(res, error.statusCode || 500, false, "Server error while updating profile picture", null, error.message);
    }
};
