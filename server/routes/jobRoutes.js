import express from 'express';
import { ExpressValidator } from 'express-validator';
import { authMiddleware } from '../middleware/authMIddleware.js';
import { jobMiddleware } from '../middleware/jobMiddleware.js';
import { jobController } from '../controllers/jobController.js';


const jobRouter = express.Router();
const { body } = new ExpressValidator();

//To add a job
jobRouter.post("/jobs", [
    body("title").notEmpty().withMessage("provide a job title"),
    body("description").notEmpty().withMessage("provide a description"),
    body("category").notEmpty().withMessage("provide a category"),
    body("location").notEmpty().withMessage("provide a location"),
    body("level").notEmpty().withMessage("provide a level")
], authMiddleware.checkAuthorization, jobMiddleware.checkDuplicateJob, jobController.addJob);

//To get all jobs
jobRouter.get("/jobs/all-jobs", jobController.getAllJobs);

//To get paginated jobs
jobRouter.get("/jobs/paginated", jobController.getPaginatedJobs);

//To update a job
jobRouter.patch("/jobs/:id", authMiddleware.checkAuthorization, jobController.updateJob);

//To delete a job
jobRouter.delete("/jobs/:id", authMiddleware.checkAuthorization, jobController.deleteJob);

//To search jobs by providing any search key (job title, category, location, job level)
jobRouter.get("/jobs/searched-jobs", jobController.serachJobs);

//To search jobs by job title and location
jobRouter.get("/jobs/searched-jobs-by-title-and-location", jobController.searchJobsByTitleAndLocation);

//To filter jobs by categories and loccations
jobRouter.get("/jobs/filtered", jobController.filterJobs);

jobRouter.get("/jobs", jobController.jobs);

export default jobRouter;