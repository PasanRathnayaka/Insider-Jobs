
import { useQuery } from "@tanstack/react-query";
import { jobAPI } from "../utils/api.js";

export const useJobs = (page) => {
    return useQuery({
        queryKey: ["jobs", page],
        queryFn: async () => {
            const data = await jobAPI.jobs({ page: page });
            return {
                jobs: data.data.paginatedResult.paginatedJobs,
                pages: data.data.paginatedResult.paginatedInfo.totalPages,
            };
        },
        suspense: true,
    });
};

