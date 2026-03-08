import { useSuspenseQuery } from "@tanstack/react-query";
import { getJobFilters } from "../../api/job.api.js";

export const useJobFilters = () => {
    return useSuspenseQuery({
        queryKey: ["jobFilters"],
        queryFn: async () => {
            try {
                const res = await getJobFilters();
                return res?.data || { categories: [], locations: [] };
            } catch (error) {
                console.error("Failed to fetch job filters:", error.response?.data?.message || error.message);
                throw error;
            }
        },
        suspense: true,
        staleTime: 1000 * 60 * 10,
        retry: 2,
    });
};
