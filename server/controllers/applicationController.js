import { validationResult } from "express-validator";
import { Application } from "../models/Application.js";
import { sendResponse } from "../utils/responseHandler.js";
import mongoose from "mongoose";
import { AppError } from "../utils/AppError.js";
import { isNotValidObjectId } from "../utils/checkMongoObjectId.js";


//To store a job application
export const applyJobApplication = async (req, res) => {

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

    const newApplication = new Application({
        appliedJob: jobId,
        appliedBy: user_Id,
        diliveredTo: recruiterId
    });

    await newApplication.save();

    return sendResponse(res, 201, true, "Application Submitted Successfully", newApplication);
};

//To get applied jobs by a single user
export const getAppliedJobs = async (req, res) => {

    const user_id = req.user.id;

    if (!user_id) {
        throw new AppError("User Id not found", 400);
    };

    if (isNotValidObjectId(user_id)) {
        throw new AppError("Invalid User Id", 400);
    }

    const applications = await Application.aggregate([
        {
            $match: {
                appliedBy: new mongoose.Types.ObjectId(String(user_id))
            },
        },

        {
            $lookup: {
                from: "jobs",
                localField: "appliedJob",
                foreignField: "_id",
                as: "job"
            },
        },
        { $unwind: "$job" },

        {
            $lookup: {
                from: "users",
                localField: "diliveredTo",
                foreignField: "_id",
                as: "recruiter"
            },
        },
        { $unwind: "$recruiter" },

        {
            $project: {
                _id: 1,
                appliedAt: "$createdAt",
                applicationStatus: "$status",
                jobTitle: "$job.title",
                jobLocation: "$job.location",
                jobPostedAt: "$job.createdAt",
                recruiterName: "$recruiter.username",
                recruiterImageURL: "$recruiter.imageURL",
            },
        },

        {
            $sort: { appliedAt: -1 },
        },
    ]);

    if (!applications) {
        throw new AppError("No applied jobs found", 404);
    };

    return sendResponse(res, 200, true, "Applied jobs by this user", applications);
};

//To get applicants who belong to a certian recuriter
export const getApplicants = async (req, res) => {

    const user_id = req.user.id;

    if (!user_id) {
        throw new AppError("User Id not found", 400);
    };

    if (isNotValidObjectId(user_id)) {
        throw new AppError("Invalid User Id", 400);
    }


    const applicants = await Application.aggregate([
        {
            $match: {
                diliveredTo: new mongoose.Types.ObjectId(String(user_id)),
            },
        },

        {
            $lookup: {
                from: "users",
                localField: "appliedBy",
                foreignField: "_id",
                as: "applicant"
            },
        },

        { $unwind: "$applicant" },

        {
            $lookup: {
                from: "jobs",
                localField: "appliedJob",
                foreignField: "_id",
                as: "job"
            },
        },

        { $unwind: "$job" },

        {
            $project: {
                _id: 1,
                appliedAt: "$createdAt",
                updatedAt: "$updatedAt",
                applicationStatus: "$status",
                applicant: {
                    username: "$applicant.username",
                    imageURL: "$applicant.imageURL",
                },
                appliedJob: {
                    title: "$job.title",
                    location: "$job.location"
                },
            },
        },
    ]);

    if (!applicants) {
        throw new AppError("Applicants not found", 404);
    };

    return sendResponse(res, 200, true, "Fetched Applicants", applicants);
};

//To update the status of an application that belongs to a certain recruiter
export const updateApplicationStatus = async (req, res) => {
    const { applicationId } = req.params;
    const { status } = req.body;

    const recruiterId = req.user.id;

    if (isNotValidObjectId(applicationId)) {
        throw new AppError("Invalid application Id", 400);
    }

    const allowedStatuses = ["accept", "reject"];
    if (!allowedStatuses.includes(status)) {
        throw new AppError("Invalid status value", 400);
    }

    const application = await Application.findById(applicationId).populate("appliedJob");

    if (!application) {
        throw new AppError("Application not found", 404);
    }

    if (application.appliedJob.referenceID.toString() !== recruiterId) {
        throw new AppError("Unauthorized to update the application", 403);
    }

    if (application.status !== "pending") {
        throw new AppError("Application status already finalized", 400);
    }

    application.status = status;
    await application.save();

    return sendResponse(res, 200, true, "Application status updated successfully", application);
};
