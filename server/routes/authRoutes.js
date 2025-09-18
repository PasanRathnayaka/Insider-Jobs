import express from 'express';
import { ExpressValidator } from "express-validator";
import { changePassword, deleteProfile, getProfileData, loginUser, registerUser, updateProfile, updateProfilePicture } from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMIddleware';

const authRouter = express.Router();
const { body } = new ExpressValidator();

//To register a new user
authRouter.post("/register", [
    body("username").notEmpty().withMessage("username is required"),
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password").notEmpty().withMessage("password is required")
], registerUser);

//To login a user
authRouter.post("/login", [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Invalid password")
], loginUser);

//To get profile data
authRouter.get("/get-profile-info", verifyToken, getProfileData);

//To update profile data
authRouter.patch("/update-profile-info", [
    body("username").notEmpty().withMessage("Prvoide a username"),
], verifyToken, updateProfile);

//To delete a user profile
authRouter.delete("/delete-profile", verifyToken, deleteProfile);

//To change password
authRouter.post("/change-password", [
    body("password").notEmpty().withMessage("Provide a password")
], verifyToken, changePassword);

//To update profilePicture
authRouter.put("/profile-picture", verifyToken, updateProfilePicture);

export default authRouter;