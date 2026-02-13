import { useSuspenseQuery } from "@tanstack/react-query";
import { applicationAPI } from "../utils/api";


export const useAppliedJobs = () => {
    return useSuspenseQuery({
        queryKey: ["applied-jobs"],
        queryFn: applicationAPI.getAppliedJobs,
        staleTime: 1000 * 60 * 5,
        suspense: true,
        retry: 2,
    });
};