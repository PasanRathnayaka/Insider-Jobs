import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/authRoutes.js';
import jobRouter from './routes/jobRoutes.js';
import applicationRouter from './routes/applicationRoutes.js';
import userRouter from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import { globalErrorHandler } from './middleware/errorMidleware.js';
import { asyncHandler } from './utils/asyncHandler.js';



dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use("/api/auth", authRouter);
app.use("/api/jobs", jobRouter);
app.use("/api/applications", asyncHandler(applicationRouter));
app.use("/api/users", userRouter);


app.use(globalErrorHandler);


export default app;

