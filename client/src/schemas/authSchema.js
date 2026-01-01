export const authSchema = z.object({
    mode: z.enum(['login', 'register']),
    role: z.enum(['jobseeker', 'recruiter']),
    email: z.email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    name: z.string().min(2, 'Name is required').optional(),
    businessRegistrationNumber: z.string().optional(),
}).refine((data) => {
    if (data.mode === 'register' && data.role === 'recruiter') {
        return !!data.businessRegistrationNumber && data.businessRegistrationNumber.length > 3;
    }
    return true;
}, {
    message: "Business Registration Number is required for Recruiters",
    path: ["businessRegistration"],
});