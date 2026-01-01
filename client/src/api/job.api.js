import API from "../utils/axiosInstace";

// create a new job
export const createJob = async (jobData) => {
    const res = API.post("/jobs", jobData);
    return res.data;
};

// get jobs data
export const getJobs = async (page = 1, limit = 9, search, title, category, location) => {
    const res = await API.get(`/jobs?page=${page}&limit=${limit}&search=${search}&title=${title}&category=${category}&location=${location}`);
    return res.data;
}

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