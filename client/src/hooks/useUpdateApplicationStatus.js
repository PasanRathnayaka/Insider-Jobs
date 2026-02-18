import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateApplicationStatus } from "../api/application.api";


export const useUpdateApplicationStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ applicationId, status }) => updateApplicationStatus(applicationId, { status }),

        onMutate: async ({ applicationId, status }) => {
            await queryClient.cancelQueries({ queryKey: ["applicants"] });

            const previousData =
                queryClient.getQueryData(["applicants"]);

            queryClient.setQueryData(["applicants"], (old) => {
                if (!old) return old;

                return {
                    ...old,
                    data: old.data.map((app) =>
                        app._id === applicationId
                            ? { ...app, applicationStatus: status }
                            : app
                    ),
                };
            });

            return { previousData };
        },

        onError: (error, _, context) => {
            if (context?.previousData) {
                queryClient.setQueryData(
                    ["applicants"],
                    context.previousData
                );
            }

            toast.error(
                error?.response?.data?.message ||
                "Failed to update status"
            );
        },

        onSuccess: (_, variables) => {
            toast.success(
                variables.status === "accept"
                    ? "Application accepted"
                    : "Application rejected"
            );
        },

        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["applicants"],
            });
        },
    });
};
