import z from "zod";

export const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
    role: z.enum(['jobseeker', 'recruiter']),
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    businessRegistrationNumber: z.string().optional(),
}).refine((data) => {
    if (data.role === 'recruiter') {
        return !!data.businessRegistrationNumber && data.businessRegistrationNumber.length > 3;
    }
    return true;
}, {
    message: "Business Registration Number is required for Recruiters",
    path: ["businessRegistrationNumber"],
});
