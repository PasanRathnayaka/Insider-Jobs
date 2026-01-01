import API from "../utils/axiosInstace";

// get the current user profile
export const getCurrentUser = async () => {
    const res = await API.get("/users/me");
    return res.data;
};
