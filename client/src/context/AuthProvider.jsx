import { createContext, useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { login, logout } from "../api/auth.api.js";
import { getCurrentUser } from "../api/user.api.js";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();


    const openAuthModal = () => setIsAuthModalOpen(true);
    const closeAuthModal = () => setIsAuthModalOpen(false);

    const addUserRole = (userRole) => {
        setUserRole(userRole);
    }

    const queryClient = useQueryClient();

    const clearErrors = () => setError("");

    const handleSignup = async (data) => {
    }

    const hasSession = () => {
        const session = (typeof document !== "undefined") && document.cookie.includes("loggedIn=true");
        if (session) {
            return true;
        } else {
            return false;
        }
    };

    const handleNavigateByUserRole = (user) => {
        if (!user) return;

        switch (user.role) {
            case "jobseeker":
                navigate("/apply-job");
                break;
            case "recruiter":
                navigate("/recruiter");
                break;
            default:
                navigate("/");
                break;
        }
    };


    useEffect(() => {
        if (!hasSession()) {
            navigate("/", { replace: true });
        }
    }, [hasSession()]);


    const { data: user, isLoading, isError, isLoadingError } = useQuery({
        queryKey: ["users", "me"],
        queryFn: async () => {
            try {
                const data = await getCurrentUser();
                const user = data?.data?.user;
                if (user) {
                    return user;
                } else {
                    return null;
                }
            } catch (error) {
                console.log("error while fetchin me: ", error);
                return null;
            }
        },
        enabled: hasSession,
        staleTime: Infinity,
        retry: false,
    });

    useEffect(() => {
        if (user) {
            handleNavigateByUserRole(user);
        }
    }, [user]);

    useEffect(() => {
        if (isError || isLoadingError) {
            navigate("/auth", { replace: true });
        }
    }, [isError, isLoadingError]);


    const handleLoginMutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            queryClient.setQueryData(["users", "me"], data.data.user);
            toast.success(data?.message ?? "Login successfull");
        },
        onError: (err) => {
            console.error("Error in user login:", err?.response?.data?.message || err.message);
            setError(err?.response?.data?.message);
        },
    });


    const handleLogin = async (credentials) => {
        handleLoginMutation.mutate(credentials);
    };


    const handleLogout = async () => {
        try {
            const data = await logout();
            if (data?.message) {
                toast.success(data.message);
            }
            queryClient.clear();
            navigate("/", { replace: true });
        } catch (error) {
            console.error("error in logged out: ", error);
            toast.error(error?.response?.data?.message);
        }
    };



    return (
        <AuthContext.Provider
            value={
                {
                    isAuthModalOpen, openAuthModal, closeAuthModal,
                    handleSignup, handleLogin, handleLogout,
                    user,
                    userRole, addUserRole,
                    error, clearErrors,
                    isLoading: !!(handleLoginMutation.isLoading || isLoading),
                }
            }
        >
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return ctx;
};