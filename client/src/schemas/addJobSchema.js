import { z } from "zod";

export const addJobSchema = z.object({
    title: z.string().min(1, "Job title is required"),
    description: z.string().min(1, "Description is required"),
    category: z.string().min(1, "Category is required"),
    location: z.string().min(1, "Location is required"),
    level: z.string().min(1, "Level is required"),
    salary: z
        .number({ invalid_type_error: "Salary is required" })
        .positive("Salary must be greater than 0"),

    skills: z
        .array(z.string().min(1))
        .min(1, "At least one skill is required"),
    responsibilities: z
        .array(z.string().min(1))
        .min(1, "At least one responsibility is required"),
});
