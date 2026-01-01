import express from 'express';
import { ExpressValidator } from 'express-validator';
import { checkAuthorization, verifyToken } from '../middleware/authMIddleware.js';
import { checkDuplicateJob } from '../middleware/jobMiddleware.js';
import {
    addJob,
    deleteJob,
    getJobById,
    jobs,
    updateJob,
    getAllPostedJobs
} from '../controllers/jobController.js';


const jobRouter = express.Router();
const { body } = new ExpressValidator();

//To add a job
jobRouter.post("/", [
    body("title").notEmpty().withMessage("provide a job title"),
    body("description").notEmpty().withMessage("provide a description"),
    body("category").notEmpty().withMessage("provide a category"),
    body("location").notEmpty().withMessage("provide a location"),
    body("level").notEmpty().withMessage("provide a level")
], verifyToken, checkAuthorization, checkDuplicateJob, addJob);


//To get all jobs by pagination, title, location, category
//To filter jobs by category, salary, job level
jobRouter.get("/", jobs);

// To get all jobs posted by a recruiter
jobRouter.get("/me", verifyToken, checkAuthorization, getAllPostedJobs);

// To get details of a job
jobRouter.get("/:id", getJobById);

//To update a job
jobRouter.patch("/:id", verifyToken, checkAuthorization, updateJob);

//To delete a job
jobRouter.delete("/:id", verifyToken, checkAuthorization, deleteJob);


export default jobRouter;