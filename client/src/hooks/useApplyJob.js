import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applicationAPI } from "../utils/api";
import { toast } from "react-toastify";


export const useApplyJob = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (applicationData) => applicationAPI.applyJob(applicationData),

        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["applied-jobs"] });
            toast.success(data?.message);
        },

        onError: (error) => {
            console.error(
                "Failed to apply:",
                error.response?.data?.message || error.message
            );
            toast.error("Failed apply to job");
        },

    });
};