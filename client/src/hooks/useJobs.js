
import { useSuspenseQuery } from "@tanstack/react-query";
// import { jobAPI } from "../utils/api.js";
import { getJobs } from "../api/job.api.js";

export const useJobs = ({ page, search, category, title, location }) => {
    return useSuspenseQuery({
        queryKey: ["jobs", page, search, category, title, location],
        queryFn: async () => {
            try {
                const data = await getJobs({
                    page: page,
                    search: search,
                    category: category,
                    title: title,
                    location: location,
                });

                return {
                    jobs: data?.data?.jobs,
                    pages: data?.data?.paginatedInfo?.totalPages,
                };

            } catch (error) {
                if (error?.response?.status === 404) {
                    return [];
                } else {
                    console.error("Failed to fetch jobs:", error.response?.data?.message || error.message);
                    throw error;
                }
            }
        },
        suspense: true,
        keepPreviousData: true,
        staleTime: 1000 * 60 * 3,
        retry: 2,
    });
};