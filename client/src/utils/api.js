import API from './axiosInstace';
import axiosInstance from './axiosInstace';
import { toast } from 'react-toastify';


// USERS API //

export const userAPI = {

  //To register a new user
  registerUser: async (userData) => {
    try {
      const res = await axiosInstance.post("/auth/register", userData);

      const { message } = res.data;
      const { token } = res.data.data;

      toast.success(`${message ? message : "Registered Successfully"}`);

      return { message, token };

    } catch (error) {
      const message = error?.response?.data?.message || "user already exist";
      toast.error(message);
    }
  },

  //To login user
  loginUser: async (userData) => {
    try {
      const res = await axiosInstance.post("/auth/login", userData);

      const { message } = res.data;
      // const { token } = res.data.data;

      // console.warn("TOKEN RECIEVED TO frontend API: ", token);
      // console.warn("MESSAGE RECIEVED TO frontend API: ", message);

      // toast.success(`${message ? message : "Login Successfully"}`);

      return { message };

    } catch (error) {

      const message = error?.response?.data?.message || "user not found";
      toast.error(message);
    }
  },

  //To get profile data
  getProfileInfo: async (token) => {

    try {
      const res = await axiosInstance.get("/auth/get-profile-info", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      const { message, data } = res.data;

      toast.success(`${message ? message : "fetching profile info"}`);

      return { data };

    } catch (error) {
      const message = error?.response?.data?.message;
      console.error("Error in getProfileInfo() API caller in userAPI: ", message);
    }
  },

  //To updtae profile picture
  updateProfilePicture: async (data) => {

  },

}

// ------------------------------------------------- //


// JOBS API //

export const jobAPI = {

  //To add a job
  addJob: async (jobData) => {

    try {
      const res = await axiosInstance.post("/jobs", jobData);

      const { message } = res.data;

      toast.success(`${message ? message : "Job Added Successfully"}`);

      return { message };

    } catch (error) {
      const message = error?.response?.data?.message || "user role is not defined or authorization is not valid or job already exist";
      toast.error(message);
    }
  },

  jobs: async (value) => {

    const page = value?.page || "";
    const search = value?.search || "";
    const title = value?.title || "";
    const category = value?.category || "";
    const location = value?.location || "";

    try {
      const res = await axiosInstance.get(`/jobs?page=${page}&limit=${9}&search=${search}&title=${title}&category=${category}&location=${location}`);
      return res.data;

    } catch (error) {
      const message = error?.response;
      console.warn(message);
    }
  },

  getJobById: async (jobId) => {
    try {
      const res = await API.get(`/jobs/${jobId}`);
      return res.data;

    } catch (error) {
      const message = error?.response;
      console.warn(message);
    }
  },

  getMoreJobs: async (recruiterId) => {
    const res = await API.get(`/jobs/more-jobs/${recruiterId}`);
    return res.data;
  },

}


// ----------------------------------------------- //


// RECRUITERS API //
// ------------------------------------------------ //

// APPLICATIONS API //

export const applicationAPI = {

  //To submit a job application
  applyJob: async (applicationData) => {

    try {
      const res = await axiosInstance.post("/applications/apply-job", applicationData);

      const { message, data } = res.data;

      toast.success(`${message ? message : "application submitted successfully"}`);

      if (!data) return toast.error("Data has not been received to the frontend API");

      return data;

    } catch (error) {
      const message = error?.response?.data?.message;
      console.error("Error in applyJob API caller in applicationAPI: ", message);
    }
  },

  //To get applied jobs details
  getAppliedJobs: async (token) => {

    try {
      const res = await axiosInstance.get("/applications/get-applied-jobs", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      const { message, data } = res.data;

      toast.success(`${message ? message : "fetching applied jobs"}`);

      return data;

    } catch (error) {
      const message = error?.response?.data?.message;
      console.error("Error in getAppliedJobs API caller in applicationAPI: ", message);
    }
  },

  //To get applicants who belong to a certian recruiter
  getApplicants: async (token) => {

    try {
      const res = await axiosInstance.get("/applications/get-applicants", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      const { message, data } = res.data;

      toast.success(`${message ? message : "Fetching applicants"}`);

      return { data };

    } catch (error) {
      const message = error?.response?.data?.message;
      console.error("Error in getApplicants() API caller in applicationAPI: ", message);
    }
  },
}
// ---------------------------------------------- //
