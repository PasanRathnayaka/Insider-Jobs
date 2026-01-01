import express from 'express';
import { ExpressValidator } from 'express-validator';
import { verifyToken, checkAuthorization } from '../middleware/authMIddleware.js';
import { checkExistJob } from '../middleware/jobMiddleware.js';
import { applyJobApplication, getApplicants, getAppliedJobs } from '../controllers/applicationController.js';


const applicationRouter = express.Router();
const { body } = new ExpressValidator();

//To apply a job
applicationRouter.post("/", verifyToken, checkExistJob, applyJobApplication);

//To fetch applied jobs by a single user
applicationRouter.get("/me", verifyToken, getAppliedJobs);

//To fetch applicants
applicationRouter.get("/recruiter", verifyToken, checkAuthorization, getApplicants);


export default applicationRouter;