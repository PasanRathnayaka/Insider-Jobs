import { useSuspenseQuery } from "@tanstack/react-query";
import { getPostedJobs } from "../api/job.api";


export const usePostedJobs = () => {
    return useSuspenseQuery({
        queryKey: ["posted-jobs"],
        queryFn: async () => {
            try {
                const data = await getPostedJobs();
                return data?.data?.postedJobs ?? [];

            } catch (error) {
                if (error?.response?.status === 404) {
                    return [];
                } else {
                    console.error("Failed to fetch posted jobs:", error.response?.data?.message || error.message);
                    throw error;
                }
            }
        },
        suspense: true,
        staleTime: 1000 * 60 * 3,
        retry: 2,
    });
};

