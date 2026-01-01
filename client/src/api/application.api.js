import API from "../utils/axiosInstace";

// apply for a job
export const applyJob = async (jobData) => {
    const res = await API.post("/applications", jobData);
    return res.data;
};

// get applications for a job seeker
export const getApplications = async () => {
    const res = await API.get("/applications/me");
    return res.data;
};

// get applicants for a recruiter
export const getApplicants = async () => {
    const res = await API.get("/applications/recruiter");
    return res.data;
};