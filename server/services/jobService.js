import { Job } from "../models/Job.js";
import mongoose from "mongoose";
import { AppError } from "../utils/AppError.js";

export const getJobs = async (query) => {
    const { page, limit, search, title, category, location } = query;
    const pageNo = Number(page) || 1;
    const limitValue = Number(limit) || 9;
    const skip = (pageNo - 1) * limitValue;

    let filter = { isActive: true };

    if (search) {
        filter.$or = [
            { title: { $regex: `${search}`, $options: 'i' } },
            { category: { $regex: `${search}`, $options: 'i' } },
            { location: { $regex: `${search}`, $options: 'i' } },
            { level: { $regex: `${search}`, $options: 'i' } }
        ];
    } else if (title && location) {
        filter.$and = [
            { title: { $regex: `${title}`, $options: 'i' } },
            { location: { $regex: `${location}`, $options: 'i' } }
        ];
    } else if (title) {
        const filteredTitle = title.split(" ").reduce((acc, value) => acc + value, "");
        filter.$or = [
            { title: { $regex: `${filteredTitle}`, $options: 'i' } },
            { title: { $regex: `${title}`, $options: `i` } },
        ];
    } else if (category && location) {
        filter.$and = [
            { category: { $regex: `${category}`, $options: 'i' } },
            { location: { $regex: `${location}`, $options: 'i' } },
        ];
    } else if (category && !location) {
        filter.category = { $regex: `${category}`, $options: 'i' };
    } else if (!category && location) {
        filter.location = { $regex: `${location}`, $options: 'i' };
    }

    const jobs = await Job.find(filter).skip(skip).limit(limitValue).sort({ createdAt: -1 });
    const totalJobs = await Job.countDocuments(filter);

    const paginatedInfo = {
        page: pageNo,
        totalJobs: totalJobs,
        totalPages: Math.ceil(totalJobs / limitValue)
    };

    return { jobs, paginatedInfo };
};

export const getJobFilters = async () => {
    const categories = await Job.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $project: { _id: 0, category: "$_id", count: 1 } },
        { $sort: { count: -1 } } // Sort by count descending
    ]);

    const locations = await Job.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: "$location", count: { $sum: 1 } } },
        { $project: { _id: 0, category: "$_id", count: 1 } },
        { $sort: { count: -1 } } // Sort by count descending
    ]);

    return { categories, locations };
};

export const getJobById = async (id) => {
    const job = await Job.findById(id).populate("referenceID", "_id username imageURL");

    if (!job) {
        throw new AppError("Job not found", 404);
    }

    return job;
};

export const getAllPostedJobs = async (userId) => {
    const postedJobs = await Job.aggregate([
        {
            $match: {
                referenceID: new mongoose.Types.ObjectId(String(userId)),
            },
        },
        {
            $lookup: {
                from: "applications",
                let: { jobId: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$appliedJob", "$$jobId"],
                            },
                        },
                    },
                    {
                        $count: "count",
                    },
                ],
                as: "applicantStats",
            },
        },
        {
            $addFields: {
                applicantsCount: {
                    $ifNull: [{ $arrayElemAt: ["$applicantStats.count", 0] }, 0],
                },
            },
        },
        {
            $project: {
                id: "$_id",
                title: 1,
                location: 1,
                createdAt: 1,
                isActive: 1,
                applicants: "$applicantsCount"
            }
        }
    ]);

    return postedJobs;
};

export const getMoreJobsFromRecruiter = async (recruiterId, excludeJobId) => {
    const filter = {
        isActive: true,
        referenceID: recruiterId,
    };

    if (excludeJobId) {
        filter._id = { $ne: excludeJobId };
    }

    const jobs = await Job.find(filter).sort({ createdAt: -1 }).limit(8);

    return jobs;
};

export const addJob = async (userId, jobData) => {
    const newJob = new Job({
        ...jobData,
        referenceID: userId
    });
    await newJob.save();
    return newJob;
};

export const updateJob = async (userId, jobId, updateData) => {
    const allowedFields = [
        "title",
        "description",
        "category",
        "location",
        "level",
        "salary",
        "isActive",
    ];

    const updateFilter = Object.fromEntries(
        Object.entries(updateData).filter(([key, value]) =>
            allowedFields.includes(key) && value !== undefined
        )
    );

    const job = await Job.findById(jobId);

    if (!job) {
        throw new AppError("Job not found", 404);
    }

    if (job.referenceID.toString() !== userId.toString()) {
        throw new AppError("You are not authorized to update this job", 403);
    }

    const updatedJob = await Job.findByIdAndUpdate(jobId, updateFilter, { new: true });
    return updatedJob;
};

export const deleteJob = async (userId, jobId) => {
    const job = await Job.findById(jobId);

    if (!job) {
        throw new AppError("Job not found", 404);
    }

    if (job.referenceID.toString() !== userId.toString()) {
        throw new AppError("You are not authorized to delete this job", 403);
    }

    await Job.findByIdAndDelete(jobId);
};
