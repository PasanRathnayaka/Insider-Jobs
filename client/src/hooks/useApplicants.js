import { useSuspenseQuery } from "@tanstack/react-query";
import { getApplicants } from "../api/application.api";


export const useApplicants = () => {

    return useSuspenseQuery({
        queryKey: ["applicants"],
        queryFn: async () => {
            try {
                const data = await getApplicants();
                return data;

            } catch (error) {
                if (error?.response?.status === 404) {
                    return [];
                } else {
                    console.error("Failed to fetch applicants:", error.response?.data?.message || error.message);
                    throw error;
                }
            }
        },

        suspense: true,
        staleTime: 1000 * 3,
        retry: 2,
    });
};
