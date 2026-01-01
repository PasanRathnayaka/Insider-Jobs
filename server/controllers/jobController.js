import { validationResult } from "express-validator";
import { Job } from "../models/Job.js";
import { sendResponse } from "../utils/responseHandler.js";


export const jobs = async (req, res) => {
    try {
        const { page, limit, search, title, category, location } = req.query;
        const pageNo = page ?? 1;
        const limitValue = limit ?? 9;
        const skip = (pageNo - 1) * limitValue;

        //searching jobs by any search key
        if (search !== "" && search !== null && search !== undefined) {
            const result = await Job.find({
                $or: [
                    { title: { $regex: `${search}`, $options: 'i' } },
                    { category: { $regex: `${search}`, $options: 'i' } },
                    { location: { $regex: `${search}`, $options: 'i' } },
                    { level: { $regex: `${search}`, $options: 'i' } }
                ]
            });

            if (!result) return sendResponse(res, 404, false, "Searched jobs not found");

            return sendResponse(res, 200, true, "Searched jobs", { searchedJobs: result });
        }

        //searching jobs by title and location
        if (title && location) {
            const result = await Job.find({
                $and: [
                    { title: { $regex: `${title}`, $options: 'i' } },
                    { location: { $regex: `${location}`, $options: 'i' } }
                ]
            });

            if (!result || result.length === 0) return sendResponse(res, 404, false, "Jobs not found. Title or Location not provided");

            return sendResponse(res, 200, true, "Searched jobs by title and location", { searchedJobsByTitleAndLocation: result });
        }

        // searching jobs by title
        if (title !== "" && title !== null && title !== undefined) {

            const filteredTitle = title.split(" ").reduce((acc, value) => {
                return acc + value;
            });

            const result = await Job.find({
                $or: [
                    { title: { $regex: `${filteredTitle}`, $options: 'i' } },
                    { title: { $regex: `${title}`, $options: `i` } },
                ]
            });

            if (!result || result.length === 0) return sendResponse(res, 404, false, "Job not found");

            return sendResponse(res, 200, true, "Searched jobs by title", { searchedJobsByTitle: result });
        }


        //filtering jobs by category or location
        if (category && !location) {
            const result = await Job.find({
                category: { $regex: `${category}`, $options: 'i' },
            });


            if (!result || result.length === 0) return sendResponse(res, 404, false, "Filtered jobs not found");

            return sendResponse(res, 200, true, "Filtered jobs", { filteredJobs: result });
        }
        else if (!category && location) {
            const result = await Job.find({
                location: { $regex: `${location}`, $options: 'i' },
            });


            if (!result || result.length === 0) return sendResponse(res, 404, false, "Filtered jobs not found");

            return sendResponse(res, 200, true, "Filtered jobs", { filteredJobs: result });
        }
        else if (category && location) {
            const result = await Job.find({
                $and: [
                    { category: { $regex: `${category}`, $options: 'i' } },
                    { location: { $regex: `${location}`, $options: 'i' } },
                ]
            });

            if (!result || result.length === 0) return sendResponse(res, 404, false, "Filtered jobs not found");

            return sendResponse(res, 200, true, "Filtered jobs", { filteredJobs: result });
        }


        //fetching paginated jobs
        if (page && limit) {
            const result = await Job.find()
                .skip(skip)
                .limit(limitValue)
                .sort({ createdAt: -1 });

            const totalJobs = await Job.countDocuments();

            const paginatedResult = {
                paginatedJobs: result,
                paginatedInfo: {
                    page: page,
                    totalJobs: totalJobs,
                    totalPages: Math.ceil(totalJobs / limit)
                }
            }

            if (!result) return sendResponse(res, 404, false, "Paginated jobs not found");

            return sendResponse(res, 200, true, "Paginated jobs", { paginatedResult: paginatedResult });
        }
    } catch (error) {
        return sendResponse(res, 500, false, "Server error while fetching jobs", null, error.message);
    }
};

// To get a job by Id
export const getJobById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) return sendResponse(res, 400, false, "Job Id was not found");

        const job = await Job.findById(id).populate("referenceID");

        if (!job) return sendResponse(res, 404, false, "Searched job not found");

        return sendResponse(res, 200, true, "Searched Job", { data: job });
    } catch (error) {
        return sendResponse(res, 500, false, "Server error while fetching job", null, error.message);
    }

};

// To get all jobs posted by a recruiter
export const getAllPostedJobs = async (req, res) => {
    try {
        const user_id = req.user.id;

        if (!user_id) return sendResponse(res, 400, false, "userId not found");

        const postedJobs = await Job.find({ referenceID: user_id });

        if (!postedJobs) return sendResponse(res, 404, false, "Jobs not found");

        return sendResponse(res, 200, true, "Posted jobs", { postedJobs: postedJobs });

    } catch (error) {
        return sendResponse(res, 500, false, "Server error while fetching posted jobs", null, error.message);
    }
};

//To add a job
export const addJob = async (req, res) => {
    try {

        const user_id = req.user.id;

        if (!user_id) return sendResponse(res, 400, false, "userId not found");

        const errors = validationResult(req);

        if (!errors.isEmpty()) return sendResponse(res, 400, false, "validation error", errors.array());

        const { title, description, category, location, level, salary } = req.body;

        const newJob = new Job({
            title: title,
            description: description,
            category: category,
            location: location,
            level: level,
            salary: salary,
            referenceID: user_id
        });

        await newJob.save();

        return sendResponse(res, 201, true, "job added successfully");

    } catch (error) {
        return sendResponse(res, 500, false, "Server Error", null, error.message);
    }
};

//To update a job
export const updateJob = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

        const { title, description, category, location, level, salary } = req.body;
        const { id } = req.params;

        const job = await Job.findById(id);

        if (!job) {
            return sendResponse(res, 404, false, "Job not found");
        }

        if (job.referenceID.toString() !== req.user.id.toString()) {
            return sendResponse(res, 403, false, "You are not authorized to update this job");
        }

        const updatedJob = await Job.findByIdAndUpdate(id,
            {
                title: title,
                description: description,
                category: category,
                location: location,
                level: level,
                salary: salary
            },
            { new: true }
        );

        if (!updatedJob) return sendResponse(res, 204, false, "Failed to update the job");

        return res.status(201).json({
            message: "job has been updated",
            job: updatedJob
        });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};

//To delete a job
export const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;

        const jobToBeDeleted = await Job.findByIdAndDelete(id);
        if (!jobToBeDeleted) return res.status(400).json({ message: "job already deleted" });

        if (jobToBeDeleted.referenceID.toString() !== req.user.id.toString()) {
            return sendResponse(res, 403, false, "You are not authorized to delete this job");
        }

        await Job.findByIdAndDelete(id);

        return res.status(200).json({
            message: "job deleted successfully"
        });

    } catch (error) {
        return res.status(500).json("Server Error");
    }
};
