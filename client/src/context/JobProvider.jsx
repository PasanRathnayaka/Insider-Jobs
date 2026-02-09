import { createContext, useContext, useEffect, useState } from "react";
import { jobAPI } from "../utils/api";


const JobContext = createContext();

export const JobProvider = ({ children }) => {
    const [jobs, setJobs] = useState([]);
    const [isJobAdded, setIsJobAdded] = useState(false);


    const addNewJob = async (jobData) => {
        try {
            const { message } = await jobAPI.addJob(jobData);

            if (message) {
                setIsJobAdded(true);
            }
        } catch (error) {
            return console.error("Error in adding a new job in JobProvider", error);
        }
    }



    return (
        <JobContext.Provider
            value={
                { jobs, addNewJob }
            }
        >
            {children}
        </JobContext.Provider>
    )
}

export const useJob = () => useContext(JobContext);