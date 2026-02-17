import { useSuspenseQuery } from "@tanstack/react-query";
import { getAppliedJobs } from "../api/application.api";


export const useAppliedJobs = () => {
    return useSuspenseQuery({
        queryKey: ["applied-jobs"],
        queryFn: async () => {
            try {
                const data = await getAppliedJobs();
                return data;

            } catch (error) {
                if (error?.response?.status === 404) {
                    return [];
                } else {
                    console.error("Failed to fetch applied jobs:", error.response?.data?.message || error.message);
                    throw error;
                }
            }
        },
        staleTime: 1000 * 60 * 5,
        suspense: true,
        retry: 2,
    });
};