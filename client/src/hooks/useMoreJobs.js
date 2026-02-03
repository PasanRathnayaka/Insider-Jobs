import { useSuspenseQuery } from "@tanstack/react-query";
import { jobAPI } from "../utils/api";

export const useMoreJobs = (recruiterId) => {
    return useSuspenseQuery({
        queryKey: ["more-jobs", recruiterId],
        queryFn: () => jobAPI.getMoreJobs(recruiterId),
        enabled: !!recruiterId,
        suspense: true,
        retry: 2,
    });
};
