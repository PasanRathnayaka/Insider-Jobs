import express from 'express';
import { loginUser, registerUser } from '../controllers/authController.js';
import { loginValidator, signupValidator } from '../middleware/validationMiddleware.js';


const authRouter = express.Router();

//To register a new user
authRouter.post("/signup", signupValidator, registerUser);

//To login a user
authRouter.post("/login", loginValidator, loginUser);


export default authRouter;