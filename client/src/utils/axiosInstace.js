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


API.interceptors.response.use(
    (response) => response,
    (error) => {

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

        switch (status) {
            case 401:
                // Unauthorized

                break;

            case 403:
                // Forbidden
                window.location.href = "/forbiden";
                break;

            case 404:
                // Not found
                window.location.href = "/not-found";
                break;

            case 500:
                // Server error
                toast.error("Server error. Please try again later.");
                break;

            default:
                console.error(error?.response?.data?.message);
        }

        return Promise.reject(error);
    }
);



export default API;