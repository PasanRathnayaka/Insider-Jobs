import express from 'express';
import { ExpressValidator } from 'express-validator';
import { verifyToken } from '../middleware/authMIddleware.js';
import { checkDuplicateJob } from '../middleware/jobMiddleware.js';
import {
    addJob,
    deleteJob,
    getJobById,
    jobs,
    updateJob
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
], verifyToken, checkDuplicateJob, addJob);


//To get all jobs by pagination, title, location, category
//To filter jobs by category, salary, job level
jobRouter.get("/", jobs);

// To get details of a job
jobRouter.get("/:id", getJobById);

//To update a job
jobRouter.patch("/:id", verifyToken, updateJob);

//To delete a job
jobRouter.delete("/:id", verifyToken, deleteJob);

export default jobRouter;