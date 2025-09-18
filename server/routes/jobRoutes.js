import express from 'express';
import { ExpressValidator } from 'express-validator';
import { verifyToken } from '../middleware/authMIddleware.js';
import { checkDuplicateJob } from '../middleware/jobMiddleware.js';
import { addJob, deleteJob, filterJobs, getAllJobs, getPaginatedJobs, jobs, searchJobsByTitleAndLocation, serachJobs, updateJob } from '../controllers/jobController.js';


const jobRouter = express.Router();
const { body } = new ExpressValidator();

//To add a job
jobRouter.post("/jobs", [
    body("title").notEmpty().withMessage("provide a job title"),
    body("description").notEmpty().withMessage("provide a description"),
    body("category").notEmpty().withMessage("provide a category"),
    body("location").notEmpty().withMessage("provide a location"),
    body("level").notEmpty().withMessage("provide a level")
], verifyToken, checkDuplicateJob, addJob);

//To get all jobs
jobRouter.get("/jobs/all-jobs", getAllJobs);

//To get paginated jobs
jobRouter.get("/jobs/paginated", getPaginatedJobs);

//To update a job
jobRouter.patch("/jobs/:id", verifyToken, updateJob);

//To delete a job
jobRouter.delete("/jobs/:id", verifyToken, deleteJob);

//To search jobs by providing any search key (job title, category, location, job level)
jobRouter.get("/jobs/searched-jobs", serachJobs);

//To search jobs by job title and location
jobRouter.get("/jobs/searched-jobs-by-title-and-location", searchJobsByTitleAndLocation);

//To filter jobs by categories and loccations
jobRouter.get("/jobs/filtered", filterJobs);

jobRouter.get("/jobs", jobs);

export default jobRouter;