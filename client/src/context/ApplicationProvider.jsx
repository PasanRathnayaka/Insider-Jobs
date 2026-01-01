import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { applicationAPI } from "../utils/api";
import { useAuth } from "./AuthProvider";


const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {

    const { token } = useAuth();
    // console.log("TOKEN", token);

    const [application, setApplication] = useState(
        {
            jobID: "",
            userID: "",
            recruiterID: ""
        }
    )

    const createJobApplication = (jobID, userID, recruiterID) => {
        setApplication(prev => (
            {
                jobID: jobID,
                userID: userID,
                recruiterID: recruiterID,
                token: token
            }
        ))
    }

    // console.log("After setting the application: ", application);


    //To apply a job
    useEffect(() => {

        const uploadJobApplication = async () => {

            try {
                const data = await applicationAPI.applyJob(application);

                if(!data) return console.error( "Data has not been received to the applicationProvider")

                console.log("Data received to application provider: ", data);

            } catch (error) {
                return console.error("Error in fetching application result in applicationProvider", error);
            }
        }

        uploadJobApplication();

    }, [application])



    return (
        <ApplicationContext.Provider
            value={
                { application, createJobApplication }
            }
        >
            {children}
        </ApplicationContext.Provider>
    )
}

export const useApplication = () => useContext(ApplicationContext);