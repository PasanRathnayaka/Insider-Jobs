import express from 'express';
import { changePassword, deleteProfile, getProfileData, updateProfile, updateProfilePicture, uploadProfileImageMiddleware, verifyProfilePictureUpload } from '../controllers/userController.js';
import { verifyToken } from '../middleware/authMIddleware.js';
import { body } from 'express-validator';

const userRouter = express.Router();

userRouter.post("/upload-profile-picture", uploadProfileImageMiddleware, verifyProfilePictureUpload);

//To get profile data
userRouter.get("/me", verifyToken, getProfileData);

//To update profile data
userRouter.patch("/:id", [
    body("username").notEmpty().withMessage("Prvoide a username"),
], verifyToken, updateProfile);

//To delete a user profile
userRouter.delete("/:id", verifyToken, deleteProfile);

//To change password
userRouter.patch("/:id", [
    body("password").notEmpty().withMessage("Provide a password")
], verifyToken, changePassword);

//To update profilePicture
userRouter.patch("/", verifyToken, updateProfilePicture);

export default userRouter;
