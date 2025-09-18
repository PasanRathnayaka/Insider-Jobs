import { validationResult } from "express-validator";
import { Application } from "../models/Application.js";
import { sendResponse } from "../utils/responseHandler.js";


    //To store a job application
    export const applyJob = async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) return sendResponse(res, 400, false, null, errors.array());

        const { jobID, recruiterID } = req.body;
        const user = req.user;
        const user_ID = user.id;
        const user_role = user.role;

        if (!user_ID) return sendResponse(res, 400, false, "userID not found");
        if (!user_role) return sendResponse(res, 400, false, "user role not found");


        try {
            const newApplication = new Application({
                appliedJob: jobID,
                appliedBy: user_ID,
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

        const user = req.user;
        const user_id = user.id;

        if (!user_id) return sendResponse(res, 400, false, "user_id not found. applied jobs couldn't be found");

        try {
            const result = await Application.find({ appliedBy: user_id });

            if (!result) return sendResponse(res, 404, false, "No applied jobs by this user");

            return sendResponse(res, 200, true, "Applied jobs by this user", result);

        } catch (error) {
            return sendResponse(res, 500, false, "Server error while fetching applied jobs", null, error.message);
        }
    };

    //To get applicants who belong to a certian recuriter
    export const getApplicants = async (req, res) => {

        const user = req.user;
        const user_id = user.id;

        if(!user_id) return sendResponse(res, 400, false, "user_id not found. applicants couldn't be fetched");

        try {
            const result = await Application.find({diliveredTo: user_id});

            if(!result) return sendResponse(res, 404, false, "Applicants Not Found");

            return sendResponse(res, 200, true, "Fetching Applicants", result);

        } catch (error) {
            return sendResponse(res, 500, false, "Server error while fetching applicants", null, error.message);
        }
    };