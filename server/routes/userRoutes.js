import express from 'express';
import { changePassword, deleteProfile, getProfileData, updateProfile, updateProfilePicture, uploadProfileImageMiddleware, verifyProfilePictureUpload } from '../controllers/userController.js';
import { authenticateUser } from '../middleware/authMIddleware.js';
import { body } from 'express-validator';

const userRouter = express.Router();

userRouter.post("/upload-profile-picture", uploadProfileImageMiddleware, verifyProfilePictureUpload);

//To get profile data
userRouter.get("/me", authenticateUser, getProfileData);

//To update profile data
userRouter.patch("/:id", [
    body("username").notEmpty().withMessage("Prvoide a username"),
], authenticateUser, updateProfile);

//To delete a user profile
userRouter.delete("/:id", authenticateUser, deleteProfile);

//To change password
userRouter.patch("/:id", [
    body("password").notEmpty().withMessage("Provide a password")
], authenticateUser, changePassword);

//To update profilePicture
userRouter.patch("/", authenticateUser, updateProfilePicture);

export default userRouter;
