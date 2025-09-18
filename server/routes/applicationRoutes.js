import express from 'express';
import { authMiddleware } from '../middleware/authMIddleware.js';
import { jobMiddleware } from '../middleware/jobMiddleware.js';
import { applicationController } from '../controllers/applicationController.js';
import { ExpressValidator } from 'express-validator';


const applicationRouter = express.Router();
const {body} = new ExpressValidator();

//To store a job application
applicationRouter.post("/apply-job", authMiddleware.checkAuthorization, jobMiddleware.checkExistJob, applicationController.applyJob);

//To fetch applied jobs by a single user
applicationRouter.get("/get-applied-jobs", authMiddleware.verifyToken, applicationController.getAppliedJobs);

//To fetch applicants 
applicationRouter.get("/get-applicants", authMiddleware.verifyToken, authMiddleware.verifyUserRole, applicationController.getApplicants);


export default applicationRouter;