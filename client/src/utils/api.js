import API from './axiosInstace';
import { toast } from 'react-toastify';


// USERS API //

export const userAPI = {

  //To register a new user
  registerUser: async (userData) => {
    try {
      const res = await API.post("/auth/register", userData);

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
      const res = await API.post("/auth/login", userData);

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
      const res = await API.get("/auth/get-profile-info", {
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
      const res = await API.post("/jobs", jobData);
      return res.data;

    } catch (error) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },

  jobs: async (value) => {

    const page = value?.page || "";
    const search = value?.search || "";
    const title = value?.title || "";
    const category = value?.category || "";
    const location = value?.location || "";

    try {
      const res = await API.get(`/jobs?page=${page}&limit=${9}&search=${search}&title=${title}&category=${category}&location=${location}`);
      return res.data;

    } catch (error) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },

  getJobById: async (jobId) => {
    try {
      const res = await API.get(`/jobs/${jobId}`);
      return res.data;

    } catch (error) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },

  getMoreJobs: async (recruiterId) => {
    try {
      const res = await API.get(`/jobs/more-jobs/${recruiterId}`);
      return res.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },

}


// ----------------------------------------------- //


// RECRUITERS API //

export const recruiterAPI = {

  // To get posted jobs
  getPostedJobs: async () => {
    try {
      const res = await API.get("/jobs/me");
      return res.data;

    } catch (error) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },
};
// ------------------------------------------------ //

// APPLICATIONS API //

export const applicationAPI = {

  //To submit a job application
  applyJob: async (applicationData) => {

    try {
      const res = await API.post("/applications/apply-job", applicationData);
      return res.data;

    } catch (error) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },

  //To get applied jobs details
  getAppliedJobs: async (token) => {

    try {
      const res = await API.get("/applications/get-applied-jobs", {
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
  getApplicants: async () => {

    try {
      const res = await API.get("/applications/", {
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
