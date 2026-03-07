import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { getJobById } from "../../api/job.api";


export const useJob = (jobId) => {
    const queryClient = useQueryClient();

    return useSuspenseQuery({
        queryKey: ["job", jobId],
        queryFn: async () => {
            try {
                const res = await getJobById(jobId);
                return res.data;

            } catch (error) {
                console.log(error);
                if (error?.response?.status === 404 || error?.response?.status === 500) {
                    return [];
                } else {
                    console.error("Failed to fetch job:", error.response?.data?.message || error.message);
                }
            }
        },
        initialData: () => {
            const jobsPages = queryClient.getQueriesData({
                queryKey: ["jobs"],
            });

            for (const [, data] of jobsPages) {
                const job = data?.jobs?.find(job => job.id === jobId);
                if (job) return job;
            }
        }

    });
};




