import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { jobAPI } from "../utils/api";


export const useJob = (jobId) => {
    const queryClient = useQueryClient();

    return useSuspenseQuery({
        queryKey: ["job", jobId],
        queryFn: async () => {
            const res = await jobAPI.getJobById(jobId);
            return {
                job: res.data.job
            };
        },
        initialData: () => {
            const jobsPages = queryClient.getQueriesData({
                queryKey: ["jobs"],
            });

            for (const [, data] of jobsPages) {
                const job = data?.jobs?.find(job => job.id === jobId);
                if (job) return job;
            }
        },

    });
};