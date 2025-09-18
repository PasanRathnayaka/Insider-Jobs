import express from 'express';
import { ExpressValidator } from "express-validator";
import { authController } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMIddleware.js';

const authRouter = express.Router();
const { body } = new ExpressValidator();

//To register a new user
authRouter.post("/register", [
    body("username").notEmpty().withMessage("username is required"),
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password").notEmpty().withMessage("password is required")
], authController.registerUser);

//To login a user
authRouter.post("/login", [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Invalid password")
], authController.loginUser);

//To get profile data
authRouter.get("/get-profile-info", authMiddleware.checkAuthorization, authController.getProfileData);

//To update profile data
authRouter.patch("/update-profile-info", [
    body("username").notEmpty().withMessage("Prvoide a username"),
], authMiddleware.checkAuthorization, authController.updateProfile);

//To delete a user profile
authRouter.delete("/delete-profile", authMiddleware.checkAuthorization, authController.deleteProfile);

//To change password
authRouter.post("/change-password", [
    body("password").notEmpty().withMessage("Provide a password")
], authMiddleware.checkAuthorization, authController.changePassword);

//To update profilePicture
authRouter.put("/profile-picture", authMiddleware.checkAuthorization, authController.updateProfilePicture);

export default authRouter;