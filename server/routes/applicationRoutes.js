import express from 'express';
import { ExpressValidator } from 'express-validator';
import { verifyToken, checkAuthorization } from '../middleware/authMIddleware.js';
import { checkExistJob } from '../middleware/jobMiddleware.js';
import { applyJob, getApplicants, getAppliedJobs } from '../controllers/applicationController.js';


const applicationRouter = express.Router();
const { body } = new ExpressValidator();

//To store a job application
applicationRouter.post("/", verifyToken, checkExistJob, applyJob);

//To fetch applied jobs by a single user
applicationRouter.get("/:id", verifyToken, getAppliedJobs);

//To fetch applicants 
applicationRouter.get("/applicants", verifyToken, checkAuthorization, getApplicants);


export default applicationRouter;