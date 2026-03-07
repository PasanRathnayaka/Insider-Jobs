import axios from "axios";
import { toast } from "react-toastify";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
            toast.error('Connection Timed Out', {
                description: 'Please check your internet connection or try again.',
            });
        }

        if (error.message === 'Network Error' && error.code === "ERR_NETWORK") {
            toast.error('No Internet Connection', {
                description: "We couldn't reach the server.Please check your connection.",
            });
        }

        if (!window.navigator.onLine) {
            toast.error("You are currently offline.");
        }

        if (!error.response) {
            toast.error("Network error.Try again.");
            return Promise.reject(error);
        }

        const status = error.response.status;

        // Auto-refresh mechanism
        if (status === 401 && !originalRequest._retry && originalRequest.url !== '/auth/refresh-token' && originalRequest.url !== '/auth') {

            if (isRefreshing) {
                // If already refreshing, queue the requests until it finishes
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                }).then(() => {
                    return API(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Manually calling axios for the refresh endpoint to not trigger the interceptor again
                await axios.post('http://localhost:5000/api/auth/refresh-token', {}, { withCredentials: true });

                processQueue(null);

                // Retry the original request that failed
                return API(originalRequest);
            } catch (err) {
                processQueue(err, null);

                // If refresh failed, session is truly dead. Terminate silently 
                if (window.location.pathname !== '/auth') {
                    // Redirect to login or dispatch log out action here. 
                    window.location.href = '/auth';
                }

                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        switch (status) {
            case 401:
                break; 
                
            case 403:
                window.location.href = "/forbiden";
                break;

            case 500:
                toast.error("Server error. Please try again later.");
                break;

            default:
                if (status !== 401) {
                    console.error(error?.response?.data?.message);
                }
        }

        return Promise.reject(error);
    }
);



export default API;