import API from "../utils/axiosInstace";

// user login
export const login = async (credentials) => {
    const res = await API.post("/auth/login", credentials);
    return res.data;
};

// user regestration
export const registerUser = async (credentials) => {
    const res = await API.post("/auth/signup", credentials);
    return res.data;
};

// user logout
export const logout = async () => {
    const res = await API.post("/auth/logout");
    return res.data;
};
