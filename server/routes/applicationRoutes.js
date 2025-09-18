import express from 'express';
import { ExpressValidator } from 'express-validator';
import { verifyToken, verifyUserRole } from '../middleware/authMIddleware';
import { checkExistJob } from '../middleware/jobMiddleware';
import { applyJob, getApplicants, getAppliedJobs } from '../controllers/applicationController.js';


const applicationRouter = express.Router();
const {body} = new ExpressValidator();

//To store a job application
applicationRouter.post("/apply-job", verifyToken, checkExistJob, applyJob);

//To fetch applied jobs by a single user
applicationRouter.get("/get-applied-jobs", verifyToken, getAppliedJobs);

//To fetch applicants 
applicationRouter.get("/get-applicants", verifyToken, verifyUserRole, getApplicants);


export default applicationRouter;