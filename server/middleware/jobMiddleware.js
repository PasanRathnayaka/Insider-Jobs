import { Job } from "../models/Job.js";
import { sendResponse } from "../utils/responseHandler.js";

export const jobMiddleware = {
    //To check duplicate jobs
    checkDuplicateJob: async (req, res, next) => {
        try {
            const {title, description} = req.body;

            if(!title || !description){
                return sendResponse(res, 400, false, "Missing required fields: title, description. Couldn't check job duplication.");
            }

            const count = await Job.countDocuments({title: title} && {description: description});

            if(count > 0){
                return sendResponse(res, 400, false, "job already exists");
            }

            return next();

        } catch (error) {
            return sendResponse(res, 500, false, "server error", error.message);
        }
    },

    //To check an exist job
    checkExistJob: async (req, res, next) => {

        const {jobID} = req.body;

        if(!jobID) return sendResponse(res, 400, false, "jobID not found");


        try {
            const res = await Job.findById(jobID);

            if(!res) return sendResponse(res, 401, false, "Job not found")

            return next();
            
        } catch (error) {
            return sendResponse(res, 500, false, "Error while trying to find a job is already exist", null, error);
        }
    },
}