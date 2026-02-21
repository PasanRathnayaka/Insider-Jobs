import express from 'express';
import { ExpressValidator } from 'express-validator';
import { authenticateUser, authorizeJobseeker, authorizeRecruiter } from '../middleware/authMIddleware.js';
import { checkExistJob } from '../middleware/jobMiddleware.js';
import { applyJobApplication, getApplicants, getAppliedJobs, updateApplicationStatus } from '../controllers/applicationController.js';


const applicationRouter = express.Router();
const { body } = new ExpressValidator();

//To apply a job
applicationRouter.post("/",
    [
        body("jobId").notEmpty().withMessage("JobId is required"),
        body("recruiterId").notEmpty().withMessage("RecruiterId is required"),
    ],
    authenticateUser,
    authorizeJobseeker,
    checkExistJob,
    applyJobApplication
);

//To fetch applied jobs by a single user
applicationRouter.get(
    "/jobseeker",
    authenticateUser,
    authorizeJobseeker,
    getAppliedJobs
);

//To fetch applicants
applicationRouter.get(
    "/recruiter",
    authenticateUser,
    authorizeRecruiter,
    getApplicants
);

//To update the status of an application
applicationRouter.patch(
    "/:applicationId/status",
    authenticateUser,
    authorizeRecruiter,
    updateApplicationStatus
);


export default applicationRouter;