import { emitApplicationStatusUpdated } from "../events/applicationEvents.js";
import { Application } from "../models/Application.js";
import { createNotification } from "./notificationService.js";
import mongoose from "mongoose";
import { AppError } from "../utils/AppError.js";

export const applyJob = async (jobId, user_Id, recruiterId) => {
    const newApplication = new Application({
        appliedJob: jobId,
        appliedBy: user_Id,
        diliveredTo: recruiterId
    });

    await newApplication.save();

    await createNotification({
        recipient: recruiterId,
        sender: user_Id,
        type: "NEW_APPLICATION",
        title: "New Job Application",
        message: "You have received a new application for a job you posted.",
        metadata: {
            jobId: jobId,
            applicationId: newApplication._id,
        },
    });

    return newApplication;
};

export const getAppliedJobs = async (user_id) => {
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

    if (!applications || applications.length === 0) {
        throw new AppError("No applied jobs found", 404);
    }

    return applications;
};

export const getApplicants = async (recruiter_id) => {
    const applicants = await Application.aggregate([
        {
            $match: {
                diliveredTo: new mongoose.Types.ObjectId(String(recruiter_id)),
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
    }

    return applicants;
};

export const updateApplicationStatusService = async (applicationId, recruiterId, newStatus) => {

    const application = await Application.findById(applicationId)
        .populate("appliedJob")
        .populate("appliedBy");

    if (!application) {
        throw new AppError("Application not found", 404);
    }

    if (application.appliedJob.referenceID.toString() !== recruiterId) {
        throw new AppError("Unauthorized to update the application", 403);
    }

    if (application.status !== "pending") {
        throw new AppError("Application status already finalized", 400);
    }

    application.status = newStatus;
    await application.save();

    await createNotification({
        recipient: application.appliedBy,
        sender: recruiterId,
        type: "APPLICATION_STATUS_UPDATED",
        title: "Application Status Updated",
        message: `Your application has been ${newStatus}`,
        metadata: {
            jobId: application.appliedJob,
            applicationId: application._id,
        },
    });


    emitApplicationStatusUpdated({
        applicationId: application._id,
        applicantId: application.appliedBy._id,
        recruiterId,
        jobTitle: application.appliedJob.title,
        status: newStatus,
    });

    return application;
};