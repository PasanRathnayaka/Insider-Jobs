import express from 'express';
import {uploadProfileImageMiddleware, verifyProfilePictureUpload} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/upload-profile-picture", uploadProfileImageMiddleware, verifyProfilePictureUpload);

export default userRouter;
