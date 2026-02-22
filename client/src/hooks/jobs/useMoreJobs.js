import { useSuspenseQuery } from "@tanstack/react-query";
import { getMoreJobs } from "../../api/job.api";

export const useMoreJobs = (recruiterId, currentJobId) => {
    return useSuspenseQuery({
        queryKey: ["more-jobs", recruiterId],
        queryFn: async () => {
            try {
                const data = await getMoreJobs(recruiterId, currentJobId);
                return data;

            } catch (error) {
                if (error?.response?.status === 404) {
                    return [];
                } else {
                    console.error("Failed to fetch more jobs:", error.response?.data?.message || error.message);
                    throw error;
                }
            }
        },
        enabled: !!recruiterId,
        suspense: true,
        retry: 2,
    });
};
