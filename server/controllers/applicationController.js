import { validationResult } from "express-validator";
import { Application } from "../models/Application.js";
import { sendResponse } from "../utils/responseHandler.js";
import mongoose from "mongoose";


//To store a job application
export const applyJobApplication = async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) return sendResponse(res, 400, false, null, errors.array());

        const { jobId, recruiterId } = req.body;
        const user_Id = req.user.id;

        if (!user_Id) return sendResponse(res, 400, false, "userID not found");

        if (!jobId) return sendResponse(res, 400, false, "jobId not found");
        if (!recruiterId) return sendResponse(res, 400, false, "recruiterId not found");

        const newApplication = new Application({
            appliedJob: jobId,
            appliedBy: user_Id,
            diliveredTo: recruiterId
        });

        await newApplication.save();

        return sendResponse(res, 201, true, "Application Submitted Successfully", newApplication);

    } catch (error) {
        return sendResponse(res, 500, false, "Server error while submitting the application", null, error.message);
    }

};

//To get applied jobs by a single user
export const getAppliedJobs = async (req, res) => {
    try {
        const user_id = req.user.id;

        if (!user_id) return sendResponse(res, 400, false, "userId not found");

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

        if (!applications) return sendResponse(res, 404, false, "No applied jobs for this user");

        return sendResponse(res, 200, true, "Applied jobs by this user", applications);

    } catch (error) {
        return sendResponse(res, 500, false, "Server error while fetching applied jobs", null, error.message);
    }
};

//To get applicants who belong to a certian recuriter
export const getApplicants = async (req, res) => {
    try {
        const user_id = req.user.id;

        if (!user_id) return sendResponse(res, 400, false, "userId not found");

        const result = await Application.find({ diliveredTo: user_id }).populate("appliedBy", "username imageURL");

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

        if (!applicants) return sendResponse(res, 404, false, "Applicants Not Found");

        return sendResponse(res, 200, true, "Fetched Applicants", applicants);

    } catch (error) {
        return sendResponse(res, 500, false, "Server error while fetching applicants", null, error.message);
    }
};