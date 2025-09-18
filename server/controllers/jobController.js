import { validationResult } from "express-validator";
import { Job } from "../models/Job.js";
import { sendResponse } from "../utils/responseHandler.js";


//To add a job
export const addJob = async (req, res) => {
    const user = req.user;
    const user_role = user.role;
    const user_id = user.id;

    const errors = validationResult(req);

    if (!errors.isEmpty()) return sendResponse(res, 400, false, "validation error", errors.array());

    if (!user_role) return sendResponse(res, 400, false, "user role not defined");

    if (user_role !== "recruiter") return sendResponse(res, 401, false, "Not authorized");

    const { title, description, category, location, level, salary } = req.body;

    try {

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

//To get all jobs
export const getAllJobs = async (req, res) => {
    if (!req) return res.status(404).json({ message: "Request Not Found" });

    try {
        const allJobs = await Job.find({});

        if (!allJobs) return res.status(404).json({ message: "Jobs Not Found" });

        return res.status(200).json({
            message: "fetching all jobs",
            data: allJobs
        })
    } catch (error) {
        return res.status(500).json(error);
    }
};

//To get paginated jobs
export const getPaginatedJobs = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;


    try {
        const fetchedJobs = await Job.find()
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });


        const totalJobs = await Job.countDocuments();

        const paginatedResult = {
            total: totalJobs,
            page: page,
            pages: Math.ceil(totalJobs / limit)
        }

        return sendResponse(res, 200, true, "Paginated Jobs", { fetchedJobs, paginatedResult });


    } catch (error) {
        return sendResponse(res, 500, false, "Server error while fetching paginated jobs", null, error.message);
    }
};

//To update a job
export const updateJob = async (req, res) => {
    const user = req.user;
    const user_role = user.role;

    if (!user_role) return res.status(400).json({ message: "role is not defined" });

    if (!user_role === "recruiter") return res.status(401).json({ message: "authorization is not valid" });

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    const { title, description, category, location, level, salary, jobID } = req.body;


    try {

        await Job.findByIdAndUpdate(jobID, {
            title: title,
            description: description,
            category: category,
            location: location,
            level: level,
            salary: salary
        });

        const updatedJob = await Job.findById(jobID);

        return res.status(201).json({
            message: "job has been updated",
            data: updatedJob
        })
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};

//To delete a job
export const deleteJob = async (req, res) => {
    const user = req.user;
    const user_role = user.role;

    if (!user_role) return res.status(400).json({ message: "user role not defined" });

    if (user_role !== "recruiter") return res.status(401).json({ message: "authorization failed" });

    const { job_id } = req.body;

    try {
        const jobToBeDeleted = await Job.findByIdAndDelete(job_id);
        if (!jobToBeDeleted) return res.status(400).json({ message: "job already deleted" });

        const currentJobs = await Job.find();

        return res.status(204).json({
            message: "job deleted successfully",
            data: currentJobs
        });

    } catch (error) {
        return res.status(500).json("Server Error");
    }
};

//To search jobs
export const serachJobs = async (req, res) => {

    const searchValue = req.query.searchValue;

    if (!searchValue) return sendResponse(res, 400, false, "Enter something to search");

    try {

        const searchedResult = await Job.find({
            $or: [
                { title: { $regex: `${searchValue}`, $options: 'i' } },
                { category: { $regex: `${searchValue}`, $options: 'i' } },
                { location: { $regex: `${searchValue}`, $options: 'i' } },
                { level: { $regex: `${searchValue}`, $options: 'i' } }
            ]
        });

        if (searchedResult.length === 0) return sendResponse(res, 404, false, "No Results Found");

        return sendResponse(res, 200, true, "Searched Result", { searchedResult: searchedResult });

    } catch (error) {
        return sendResponse(res, 500, false, "Server error while searching", null, error.message);
    }
};

//To search jobs by job title and location
export const searchJobsByTitleAndLocation = async (req, res) => {

    const title = req.query.title;
    const location = req.query.location;

    if (!title || !location) return sendResponse(res, 400, false, `Provide ${!title ? "a job title" : "a job location"} to continue search`);


    try {
        const searchedResult = await Job.find({
            $and: [
                { title: { $regex: `${title}`, $options: 'i' } },
                { location: { $regex: `${location}`, $options: 'i' } },
            ]
        });

        if (searchedResult.length === 0) return sendResponse(res, 400, false, "Searched result not found");

        return sendResponse(res, 200, true, "Searched Result", { searchedResult: searchedResult });

    } catch (error) {
        return sendResponse(res, 500, false, "Server error while searching jobs by title and location", null, error.message);
    }
};

//To filter jobs by category and location
export const filterJobs = async (req, res) => {

    const category = req.query.category;
    const location = req.query.location;

    try {
        const filteredResult = await Job.find({
            $or: [
                { category: { $regex: `${category}`, $options: 'i' } },
                { location: { $regex: `${location}`, $options: 'i' } }
            ]
        });

        if (filteredResult.length === 0) return sendResponse(res, 404, false, "Jobs not found");

        return sendResponse(res, 200, true, "Filtered Jobs", filteredResult);

    } catch (error) {
        return sendResponse(res, 500, false, "Server error while filtering jobs", null, error.message);
    }
};

export const jobs = async (req, res) => {
    try {
        const { page, limit, search, title, category, location } = req.query;

        const pageNo = parseInt(page) || 1;
        const limitValue = parseInt(limit) || 9;
        const skip = (pageNo - 1) * limitValue;

        //searching jobs by any search key
        if (search) {
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


        //filtering jobs by category or location
        if (category && !location) {
            const result = await Job.find({
                category: { $regex: `${category}`, $options: 'i' },
            });


            if (!result) return sendResponse(res, 404, false, "Filtered jobs not found");

            return sendResponse(res, 200, true, "Filtered jobs", { filteredJobs: result });
        }
        else if (!category && location) {
            const result = await Job.find({
                location: { $regex: `${location}`, $options: 'i' },
            });


            if (!result) return sendResponse(res, 404, false, "Filtered jobs not found");

            return sendResponse(res, 200, true, "Filtered jobs", { filteredJobs: result });
        }
        else if (category && location) {
            const result = await Job.find({
                $and: [
                    { category: { $regex: `${category}`, $options: 'i' } },
                    { location: { $regex: `${location}`, $options: 'i' } },
                ]
            });

            if (!result) return sendResponse(res, 404, false, "Filtered jobs not found");

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