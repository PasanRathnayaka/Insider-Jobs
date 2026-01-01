import { validationResult } from "express-validator";
import { Application } from "../models/Application.js";
import { sendResponse } from "../utils/responseHandler.js";


//To store a job application
export const applyJobApplication = async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) return sendResponse(res, 400, false, null, errors.array());

        const { jobID, recruiterID } = req.body;
        const user_Id = req.user.id;

        if (!user_Id) return sendResponse(res, 400, false, "userID not found");

        const newApplication = new Application({
            appliedJob: jobID,
            appliedBy: user_Id,
            diliveredTo: recruiterID
        });

        const result = await newApplication.save();

        return sendResponse(res, 201, true, "Application Submitted Successfully", result);

    } catch (error) {
        return sendResponse(res, 500, false, "Server error while submitting the application", null, error.message);
    }

};

//To get applied jobs by a single user
export const getAppliedJobs = async (req, res) => {
    try {
        const user_id = req.user.id;

        if (!user_id) return sendResponse(res, 400, false, "userID not found. applied jobs couldn't be found");

        const result = await Application.find({ appliedBy: user_id });

        if (!result) return sendResponse(res, 404, false, "No applied jobs by this user");

        return sendResponse(res, 200, true, "Applied jobs by this user", result);

    } catch (error) {
        return sendResponse(res, 500, false, "Server error while fetching applied jobs", null, error.message);
    }
};

//To get applicants who belong to a certian recuriter
export const getApplicants = async (req, res) => {
    try {
        const user_id = req.user.id;

        if (!user_id) return sendResponse(res, 400, false, "userId not found. applicants couldn't be fetched");

        const result = await Application.find({ diliveredTo: user_id });

        if (!result) return sendResponse(res, 404, false, "Applicants Not Found");

        return sendResponse(res, 200, true, "Fetched Applicants", result);

    } catch (error) {
        return sendResponse(res, 500, false, "Server error while fetching applicants", null, error.message);
    }
};