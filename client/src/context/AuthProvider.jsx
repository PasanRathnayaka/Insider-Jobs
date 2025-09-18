import { createContext, useContext, useState } from "react";
import { toast } from 'react-toastify'
import { userAPI } from "../services/api.js";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import LodingAnimation from "../components/LodingAnimation";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [userRole, setUserRole] = useState(null);
    //const [registeredUsers, setRegistedUsers] = useState([]);
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    //const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [redirectPathAfterLogin, setRedirectPathAfterLogin] = useState(null);
    const navigate = useNavigate();


    const openAuthModal = () => setIsAuthModalOpen(true);
    const closeAuthModal = () => setIsAuthModalOpen(false);

    const addUserRole = (userRole) => {
        setUserRole(userRole);
    }


    const signup = async (data) => {
        try {
            const { token } = await userAPI.registerUser(data) || {};

            if (token) {
                setUser(token);
            }

        } catch (error) {
            return console.error("Error in signup function in AuthProvider", error);
        }

        //setRegistedUsers(prev => [...prev, data])
    }

    const login = async (userData) => {
        try {

            if (!userData) return console.error("provide login credentials to login");

            const { token } = await userAPI.loginUser(userData) || {};

            if (token) {
                localStorage.setItem("token", token);
                //setIsLoggedIn(true);
                //return <Navigate to={"/apply-job"} />
                //const decodedToken = jwtDecode(localStorage.getItem("token"));
                //setUser(decodedToken);
                setRedirectPathAfterLogin(null);

            }

        } catch (error) {
            return console.error("Error from login function in AuthProvider", error);
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
        setRedirectPathAfterLogin(null);
        //setIsLoggedIn(false);
        <Navigate to="/" />
        toast.success("Logged out");
    }

    useEffect(() => {
        const intervalID = setInterval(() => {
            const fetchedToken = localStorage.getItem("token");
            setToken(fetchedToken);
        }, 2000);

        return () => clearInterval(intervalID);
    }, [])

    useEffect(() => {

        if (token) {
            const authorizedUser = token ? jwtDecode(token) : null;
            setUser(authorizedUser);
            setIsLoading(false);
        }

    }, [token])

    useEffect(() => {

        if (user) {

            let defaultRoute;
            switch (user.role) {
                case "user":
                    defaultRoute = "/apply-job";
                    break;
                case "recruiter":
                    defaultRoute = "/recruiter";
                    break;
                default:
                    defaultRoute = "/";
                    break;
            }

            closeAuthModal();
            navigate(redirectPathAfterLogin || defaultRoute, { replace: true });
        }
    }, [user])

    
    // console.log("From auth provider: ", isAuthModalOpen);
    console.log("user login data from auth provider: ", user);
    // console.log("Stored Path: ", redirectPathAfterLogin);
    // //console.log("registered users data from auth provider: ", registeredUsers);
    // console.log("user role: ", userRole);
    // console.log("TOKEN: ", token);


    return (
        <AuthContext.Provider
            value={
                {
                    isAuthModalOpen, openAuthModal, closeAuthModal,
                    signup, login, logout, user, token,
                    userRole, addUserRole,
                    isLoading,
                    redirectPathAfterLogin, setRedirectPathAfterLogin,

                }
            }
        >
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext);

