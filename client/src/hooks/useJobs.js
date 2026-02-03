
import { useSuspenseQuery } from "@tanstack/react-query";
import { jobAPI } from "../utils/api.js";

export const useJobs = ({ page, search, category, title, location }) => {
    return useSuspenseQuery({
        queryKey: ["jobs", page, search, category, title, location],
        queryFn: async () => {
            const data = await jobAPI.jobs({
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
        },
        suspense: true,
        keepPreviousData: true,
        staleTime: 1000 * 60 * 3,
        retry: 2,
    });
};