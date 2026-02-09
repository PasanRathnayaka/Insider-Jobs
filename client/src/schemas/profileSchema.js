import z from "zod";


export const editProfileSchema = z.object({
    username: z.string().optional(),
    email: z.email('Please enter a valid email address'),
});