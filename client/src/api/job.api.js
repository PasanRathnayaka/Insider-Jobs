import API from "../utils/axiosInstace";

// create a new job
export const createJob = async (jobData) => {
    const res = API.post("/jobs", jobData);
    return res.data;
};

// get jobs data
export const getJobs = async (payload) => {

    const page = payload?.page ?? "";
    const limit = payload?.limit ?? 9;
    const search = payload?.search ?? "";
    const title = payload?.title ?? "";
    const category = payload?.category ?? "";
    const location = payload?.location ?? "";

    const res = await API.get(`/jobs?page=${page}&limit=${limit}&search=${search}&title=${title}&category=${category}&location=${location}`);
    return res.data;
}

// get job by Id
export const getJobById = async (jobId) => {
    const res = await API.get(`/jobs/${jobId}`);
    return res.data;
};

// get more jobs from a certian recruiter
export const getMoreJobs = async (recruiterId, excludeJobId) => {
    const res = await API.get(`/jobs/more-jobs/?recruiterId=${recruiterId}&excludeJobId=${excludeJobId}`);
    return res.data;
};

// To get posted jobs
export const getPostedJobs = async () => {
    const res = await API.get("/jobs/me");
    return res.data;
};

// update a job
export const updateJobById = async (jobId) => {
    const res = await API.patch(`/jobs/${jobId}`);
    return res.data;
};

// delete a job
export const deleteJobById = async (jobId) => {
    const res = await API.delete(`/jobs/${jobId}`);
    return res.data;
};