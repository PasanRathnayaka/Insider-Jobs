import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify'
import { replace, useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { login, logout, registerUser } from "../api/auth.api.js";
import { getCurrentUser } from "../api/user.api.js";
import { useSocketConnection, useSocketDisconnect } from "../hooks/useSocket.js";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const queryClient = useQueryClient();

    const clearErrors = () => setError("");

    const hasSession = () => {
        return (typeof document !== "undefined") && document.cookie.includes("loggedIn=true");
    };

    const handleNavigateByUserRole = (user) => {
        if (!user) {
            navigate("/auth", replace);
        };

        switch (user.role) {
            case "jobseeker":
                navigate("/apply-job", { replace: location?.pathname });
                break;
            case "recruiter":
                navigate("/recruiter", { replace: location?.pathname });
                break;
            default:
                navigate("/");
                break;
        }
    };

    const { data: user, isLoading } = useQuery({
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
                // eslint-disable-next-line no-unused-vars
            } catch (error) {
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


    const handleRegisterMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            queryClient.invalidateQueries(["users", "me"]);
            toast.success(data?.message);
        },
        onError: (err) => {
            console.error("Error in user registration:", err?.response?.data?.message || err.message);
            setError(err?.response?.data?.message);
        },
    });

    const handleRegister = useCallback(async (credentials) => {
        handleRegisterMutation.mutateAsync(credentials);
    }, []);


    const handleLoginMutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            queryClient.setQueryData(["users", "me"], data.data.user);

            toast.success(data?.message ?? "Login successfull");

            useSocketConnection();
        },
        onError: (err) => {
            console.error("Error in user login:", err?.response?.data?.message || err.message);
            setError(err?.response?.data?.message);
        },
    });

    const handleLogin = useCallback(async (credentials) => {
        handleLoginMutation.mutateAsync(credentials);
    }, []);


    const handleLogout = useCallback(async () => {
        try {
            const data = await logout();

            useSocketDisconnect();

            if (data?.message) {
                toast.success(data.message);
            }
            queryClient.clear();
            navigate("/", { replace: true });
        } catch (error) {
            console.error("error in logging out: ", error);
            toast.error(error?.response?.data?.message);
        }
    }, []);



    return (
        <AuthContext.Provider
            value={
                {
                    handleRegister,
                    handleLogin,
                    handleLogout,
                    user,
                    error,
                    clearErrors,
                    isLoading: !!(handleLoginMutation.isLoading || handleRegisterMutation.isLoading || isLoading),
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


