import { useSuspenseQuery } from "@tanstack/react-query";
import { recruiterAPI } from "../utils/api";

export const usePostedJobs = () => {
    return useSuspenseQuery({
        queryKey: ["posted-jobs"],
        queryFn: async () => {
            try {
                const data = await recruiterAPI.getPostedJobs();
                return data?.data?.postedJobs;
            } catch (error) {
                console.log(error?.response?.data?.message || "Failed to fetched posted jobs");
            }
        },
        suspense: true,
        retry: 2,
    });
};
