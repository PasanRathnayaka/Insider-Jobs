import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createJob } from "../api/job.api";
import { toast } from "react-toastify";
import { jobAPI } from "../utils/api";


export const useAddJob = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (jobData) => jobAPI.addJob(jobData),

        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["jobs"] });
            toast.success(data?.message ?? "Job added successfully**");
        },

        onError: (error) => {
            console.error(
                "Add job failed:",
                error.response?.data?.message || error.message
            );
            toast.error("Failed to add job");
        },
    });
};
