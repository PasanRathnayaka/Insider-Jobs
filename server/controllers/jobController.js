import { validationResult } from "express-validator";
import { sendResponse } from "../utils/responseHandler.js";
import * as jobService from "../services/jobService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";
import { isNotValidObjectId } from "../utils/checkMongoObjectId.js";

export const jobs = asyncHandler(async (req, res) => {
    const { jobs, paginatedInfo } = await jobService.getJobs(req.query);

    if (!jobs || jobs.length === 0) {
        return sendResponse(res, 404, false, "Jobs not found", { jobs: [], paginatedInfo });
    }

    return sendResponse(res, 200, true, "Jobs fetched successfully", { jobs, paginatedInfo });
});

// To get available categories and locations for filtering
export const getJobFilters = asyncHandler(async (_req, res) => {
    const filters = await jobService.getJobFilters();
    return sendResponse(res, 200, true, "Job filters fetched", filters);
});

// To get a job by Id
export const getJobById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new AppError("Job Id was not found", 400);
    };

    if (isNotValidObjectId(id)) {
        throw new AppError("Invalid Job Id", 400);
    };

    const job = await jobService.getJobById(id);

    return sendResponse(res, 200, true, "Searched Job", job);
});

// To get all jobs posted by a recruiter
export const getAllPostedJobs = asyncHandler(async (req, res) => {
    const user_id = req.user.id;

    if (!user_id) return sendResponse(res, 400, false, "userId not found");

    const postedJobs = await jobService.getAllPostedJobs(user_id);

    if (!postedJobs || postedJobs.length === 0) return sendResponse(res, 404, false, "No jobs found", postedJobs);

    return sendResponse(res, 200, true, "Posted jobs", { postedJobs });
});

// To get suggested jobs from a particular recruiter
export const getMoreJobsFromRecruiter = asyncHandler(async (req, res) => {
    const { recruiterId, excludeJobId } = req.query;

    if (!recruiterId) return sendResponse(res, 400, false, "Recruiter Id was not found");

    const jobs = await jobService.getMoreJobsFromRecruiter(recruiterId, excludeJobId);

    return sendResponse(res, 200, true, "More jobs", jobs);
});

//To add a job
export const addJob = asyncHandler(async (req, res) => {
    const user_id = req.user.id;

    if (!user_id) return sendResponse(res, 400, false, "userId not found");

    const errors = validationResult(req);

    if (!errors.isEmpty()) return sendResponse(res, 400, false, "validation error", errors.array());

    const newJob = await jobService.addJob(user_id, req.body);

    return sendResponse(res, 201, true, "job added successfully", { job: newJob });
});

//To update a job
export const updateJob = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return sendResponse(res, 422, false, "validation error", errors.array());

    const { id } = req.params;

    const updatedJob = await jobService.updateJob(req.user.id, id, req.body);

    return sendResponse(res, 201, true, "job updated successfully", { job: updatedJob });
});

//To delete a job
export const deleteJob = asyncHandler(async (req, res) => {
    const { id } = req.params;

    await jobService.deleteJob(req.user.id, id);

    return sendResponse(res, 200, true, "job deleted successfully");
});

