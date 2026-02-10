import express from 'express';
import { ExpressValidator } from 'express-validator';
import { verifyToken, authorizeJobseeker, authorizeRecruiter } from '../middleware/authMIddleware.js';
import { checkExistJob } from '../middleware/jobMiddleware.js';
import { applyJobApplication, getApplicants, getAppliedJobs } from '../controllers/applicationController.js';


const applicationRouter = express.Router();
const { body } = new ExpressValidator();

//To apply a job
applicationRouter.post("/", verifyToken, authorizeJobseeker, checkExistJob, applyJobApplication);

//To fetch applied jobs by a single user
applicationRouter.get("/me", verifyToken, authorizeJobseeker, getAppliedJobs);

//To fetch applicants
applicationRouter.get("/recruiter", verifyToken, authorizeRecruiter, getApplicants);


export default applicationRouter;