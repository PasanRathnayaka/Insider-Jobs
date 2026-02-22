import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { applyJob } from "../../api/application.api";


export const useApplyJob = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (applicationData) => applyJob(applicationData),

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