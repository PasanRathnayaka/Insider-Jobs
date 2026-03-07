import { validationResult } from "express-validator";
import { sendResponse } from "../utils/responseHandler.js";
import { AppError } from "../utils/AppError.js";
import { isNotValidObjectId } from "../utils/checkMongoObjectId.js";
import * as applicationService from "../services/applicationService.js";
import { asyncHandler } from "../utils/asyncHandler.js";


//To store a job application
export const applyJobApplication = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return sendResponse(res, 400, false, null, errors.array());

    const { jobId, recruiterId } = req.body;
    const user_Id = req.user.id;

    if (!user_Id) {
        throw new AppError("User Id not found", 400);
    }

    if (isNotValidObjectId(user_Id)) {
        throw new AppError("Invalid user Id", 400);
    }

    if (!jobId) {
        throw new AppError("Job Id not found", 400);
    }

    if (isNotValidObjectId(jobId)) {
        throw new AppError("Invalid Job Id", 400);
    }

    if (!recruiterId) {
        throw new AppError("Recruiter Id not found", 400);
    }

    if (isNotValidObjectId(recruiterId)) {
        throw new AppError("Invalid recruiterId Id", 400);
    }

    const newApplication = await applicationService.applyJob(jobId, user_Id, recruiterId);

    return sendResponse(res, 201, true, "Application Submitted Successfully", newApplication);
});

//To get applied jobs by a single user
export const getAppliedJobs = asyncHandler(async (req, res) => {
    const user_id = req.user.id;

    if (!user_id) {
        throw new AppError("User Id not found", 400);
    };

    if (isNotValidObjectId(user_id)) {
        throw new AppError("Invalid User Id", 400);
    }

    const applications = await applicationService.getAppliedJobs(user_id);

    return sendResponse(res, 200, true, "Applied jobs by this user", applications);
});

//To get applicants who belong to a certian recuriter
export const getApplicants = asyncHandler(async (req, res) => {
    const user_id = req.user.id;

    if (!user_id) {
        throw new AppError("User Id not found", 400);
    };

    if (isNotValidObjectId(user_id)) {
        throw new AppError("Invalid User Id", 400);
    }

    const applicants = await applicationService.getApplicants(user_id);

    return sendResponse(res, 200, true, "Fetched Applicants", applicants);
});

//To update the status of an application that belongs to a certain recruiter
export const updateApplicationStatus = asyncHandler(async (req, res) => {
    const { applicationId } = req.params;
    const { status } = req.body;

    const recruiterId = req.user.id;

    if (isNotValidObjectId(applicationId)) {
        throw new AppError("Invalid application Id", 400);
    }

    if (isNotValidObjectId(recruiterId)) {
        throw new AppError("Invalid recruiter Id", 400);
    }

    const allowedStatuses = ["accept", "reject"];
    if (!allowedStatuses.includes(status)) {
        throw new AppError("Invalid status value", 400);
    }

    const updatedApplication = await applicationService.updateApplicationStatusService(applicationId, recruiterId, status);


    return sendResponse(res, 200, true, "Application status updated successfully", updatedApplication);
});

