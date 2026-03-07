import { validationResult } from "express-validator";
import { sendResponse } from "../utils/responseHandler.js";
import * as jobService from "../services/jobService.js";


export const jobs = async (req, res) => {
    try {
        const { jobs, paginatedInfo } = await jobService.getJobs(req.query);

        if (!jobs || jobs.length === 0) {
            return sendResponse(res, 404, false, "Jobs not found", { jobs: [], paginatedInfo });
        }

        return sendResponse(res, 200, true, "Jobs fetched successfully", { jobs, paginatedInfo });
    } catch (error) {
        return sendResponse(res, error.statusCode || 500, false, error.message || "Server error while fetching jobs");
    }
};

// To get a job by Id
export const getJobById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) return sendResponse(res, 400, false, "Job Id was not found");

        const job = await jobService.getJobById(id);

        if (!job) return sendResponse(res, 404, false, "Job not found");

        return sendResponse(res, 200, true, "Searched Job", { job });
    } catch (error) {
        return sendResponse(res, error.statusCode || 500, false, error.message || "Server error while fetching job");
    }
};

// To get all jobs posted by a recruiter
export const getAllPostedJobs = async (req, res) => {
    try {
        const user_id = req.user.id;

        if (!user_id) return sendResponse(res, 400, false, "userId not found");

        const postedJobs = await jobService.getAllPostedJobs(user_id);

        if (!postedJobs || postedJobs.length === 0) return sendResponse(res, 404, false, "No jobs found");

        return sendResponse(res, 200, true, "Posted jobs", { postedJobs });

    } catch (error) {
        return sendResponse(res, error.statusCode || 500, false, error.message || "Server error while fetching posted jobs");
    }
};

// To get suggested jobs from a particular recruiter
export const getMoreJobsFromRecruiter = async (req, res) => {
    try {
        const { recruiterId, excludeJobId } = req.query;

        if (!recruiterId) return sendResponse(res, 400, false, "Recruiter Id was not found");

        const jobs = await jobService.getMoreJobsFromRecruiter(recruiterId, excludeJobId);

        if (!jobs || jobs.length === 0) return sendResponse(res, 404, false, "No jobs found");

        return sendResponse(res, 200, true, "More jobs", jobs);

    } catch (error) {
        return sendResponse(res, error.statusCode || 500, false, error.message || "Server error while fetching more jobs");
    }
};

//To add a job
export const addJob = async (req, res) => {
    try {
        const user_id = req.user.id;

        if (!user_id) return sendResponse(res, 400, false, "userId not found");

        const errors = validationResult(req);

        if (!errors.isEmpty()) return sendResponse(res, 400, false, "validation error", errors.array());

        const newJob = await jobService.addJob(user_id, req.body);

        return sendResponse(res, 201, true, "job added successfully", { job: newJob });

    } catch (error) {
        return sendResponse(res, error.statusCode || 500, false, error.message || "Server Error");
    }
};

//To update a job
export const updateJob = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return   res.status(422).json({ errors: errors.array() });

        const { id } = req.params;

        const updatedJob = await jobService.updateJob(req.user.id, id, req.body);

        return res.status(201).json({
            message: "job updated successfully",
            job: updatedJob
        });
    } catch (error) {
        if (error.statusCode) {
            return sendResponse(res, error.statusCode, false, error.message);
        }
        return res.status(500).json({ error: error });
    }
};

//To delete a job
export const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;

        await jobService.deleteJob(req.user.id, id);

        return res.status(200).json({
            message: "job deleted successfully"
        });

    } catch (error) {
        if (error.statusCode) {
            return sendResponse(res, error.statusCode, false, error.message);
        }
        return res.status(500).json("Server Error");
    }
};

