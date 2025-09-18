import { createContext, useContext, useEffect, useState } from "react";
import { jobAPI } from "../services/api";


const JobContext = createContext();

export const JobProvider = ({ children }) => {
    const [jobs, setJobs] = useState([]);
    const [isJobAdded, setIsJobAdded] = useState(false);
   

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await jobAPI.jobs() || {};
                const allJobs = data.allJobs;

                if (allJobs) {
                    setJobs(allJobs);
                }

            } catch (error) {
                return console.error("Error in fetching data in JobProvider", error);
            }
        }

        fetchData();
    }, [])


    const addNewJob = async (jobData) => {
        try {
            const { message } = await jobAPI.addJob(jobData);

            if(message){
                setIsJobAdded(true);
            }
        } catch (error) {
            return console.error("Error in adding a new job in JobProvider", error);
        }
    }

    console.log("All fetched jobs from JobsProvider: ", jobs);
    //console.log("USER TOKEN from JobProvider: ", token);



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