import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateJobById } from "../api/job.api";
import { toast } from "react-toastify";


export const useUpdateJob = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ jobId, data }) => updateJobById(jobId, data),

        onMutate: async ({ jobId, data }) => {
            await queryClient.cancelQueries({ queryKey: ["posted-jobs"] });

            const previousJobs = queryClient.getQueryData(["posted-jobs"]);

            queryClient.setQueryData(["posted-jobs"], (old) => {
                if (!old) return old;

                return old.map((job) =>
                    job._id === jobId
                        ? { ...job, ...data }
                        : job
                );
            });

            return { previousJobs };
        },

        onError: (error, context) => {
            if (context?.previousJobs) {
                queryClient.setQueryData(
                    ["posted-jobs"],
                    context.previousJobs
                );
            }

            const message = error?.response?.data?.message || "Failed to update job. Please try again";

            toast.error(message);
        },

        onSuccess: () => {
            toast.success("Job updated successfully");
            queryClient.refetchQueries({ queryKey: ["jobs"] });
        },

        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["posted-jobs"],
            });
        },
    });
};
