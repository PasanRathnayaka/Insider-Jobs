import express from 'express';
import { ExpressValidator } from 'express-validator';
import { verifyToken, authorizeJobseeker, authorizeRecruiter } from '../middleware/authMIddleware.js';
import { checkExistJob } from '../middleware/jobMiddleware.js';
import { applyJobApplication, getApplicants, getAppliedJobs } from '../controllers/applicationController.js';


const applicationRouter = express.Router();
const { body } = new ExpressValidator();

//To apply a job
applicationRouter.post("/",
    [
        body("jobId").notEmpty().withMessage("JobId is required"),
        body("recruiterId").notEmpty().withMessage("RecruiterId is required"),
    ],
    verifyToken,
    authorizeJobseeker,
    checkExistJob,
    applyJobApplication
);

//To fetch applied jobs by a single user
applicationRouter.get("/jobseeker", verifyToken, authorizeJobseeker, getAppliedJobs);

//To fetch applicants
applicationRouter.get("/recruiter", verifyToken, authorizeRecruiter, getApplicants);


export default applicationRouter;