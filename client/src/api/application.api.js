import API from "../utils/axiosInstace";

// apply for a job
export const applyJob = async (jobData) => {
    const res = await API.post("/applications", jobData);
    return res.data;
};

// get applied jobs for a job seeker
export const getAppliedJobs = async () => {
    const res = await API.get("/applications/jobseeker");
    return res.data;
};

// get applications for a recruiter
export const getApplicants = async () => {
    const res = await API.get("/applications/recruiter");
    return res.data;
};

// update the status of an application
export const updateApplicationStatus = async (applicationId, status) => {
    const res = await API.patch(`/applications/${applicationId}/status`, status);
    return res.data;
};