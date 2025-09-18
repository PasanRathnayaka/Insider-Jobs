import express from 'express';
import { ExpressValidator } from "express-validator";
import { loginUser, registerUser } from '../controllers/authController.js';


const authRouter = express.Router();
const { body } = new ExpressValidator();

//To register a new user
authRouter.post("/signup", [
    body("username").notEmpty().withMessage("username is required"),
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password").notEmpty().withMessage("password is required")
], registerUser);

//To login a user
authRouter.post("/login", [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Invalid password")
], loginUser);


export default authRouter;