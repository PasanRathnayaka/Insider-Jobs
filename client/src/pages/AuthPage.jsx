import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, User, Building2, X, Briefcase, UserCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authSchema } from '../schemas/authSchema';



const AuthPage = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [selectedRole, setSelectedRole] = useState('jobseeker');
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(authSchema),
        defaultValues: {
            mode: 'login',
            role: 'jobseeker',
            email: '',
            password: '',
            name: '',
            businessRegistrationNumber: ''
        }
    });

    const toggleMode = () => {
        const newMode = isSignUp ? 'login' : 'register';
        setIsSignUp(!isSignUp);
        setValue('mode', newMode);
        reset({ ...watch(), mode: newMode });
    };

    const handleRoleChange = (role) => {
        setSelectedRole(role);
        setValue('role', role);
    };

    const onSubmit = async (data) => {
        console.log("Form Data Submitted:", data);
        await new Promise(resolve => setTimeout(resolve, 2000));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden relative">

                <div className="absolute top-4 right-4">
                    <button
                        className="p-2 hover:bg-gray-100 rounded-full text-gray-400"
                        onClick={() => navigate("/", { replace: true })}
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">
                            {isSignUp ? 'Create Account' : 'Welcome Back'}
                        </h1>
                        <p className="text-gray-500 text-sm mt-2">
                            {isSignUp
                                ? 'Join our job portal to find your next opportunity'
                                : 'Please sign in to continue your journey'}
                        </p>
                    </div>

                    <div className="flex p-1 bg-gray-100 rounded-lg mb-6">
                        <button
                            type="button"
                            onClick={() => handleRoleChange('jobseeker')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${selectedRole === 'jobseeker'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <UserCircle size={18} />
                            Job Seeker
                        </button>
                        <button
                            type="button"
                            onClick={() => handleRoleChange('recruiter')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${selectedRole === 'recruiter'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <Building2 size={18} />
                            Recruiter
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        {/* name */}
                        {isSignUp && (
                            <div className="space-y-1">
                                <div className={`flex items-center px-4 border rounded-xl transition-all ${errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 focus-within:border-blue-500'}`}>
                                    <User size={18} className="text-gray-400" />
                                    <input
                                        {...register('name')}
                                        type="text"
                                        placeholder="Full Name"
                                        className="w-full p-3 text-sm outline-none bg-transparent"
                                    />
                                </div>
                                {errors.name && <p className="text-xs text-red-500 ml-1">{errors.name.message}</p>}
                            </div>
                        )}

                        {/* email */}
                        <div className="space-y-1">
                            <div className={`flex items-center px-4 border rounded-xl transition-all ${errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 focus-within:border-blue-500'}`}>
                                <Mail size={18} className="text-gray-400" />
                                <input
                                    {...register('email')}
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full p-3 text-sm outline-none bg-transparent"
                                />
                            </div>
                            {errors.email && <p className="text-xs text-red-500 ml-1">{errors.email.message}</p>}
                        </div>

                        {/* business registration number */}
                        {isSignUp && selectedRole === 'recruiter' && (
                            <div className="space-y-1">
                                <div className={`flex items-center px-4 border rounded-xl transition-all ${errors.businessRegistrationNumber ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 focus-within:border-blue-500'}`}>
                                    <Briefcase size={18} className="text-gray-400" />
                                    <input
                                        {...register('businessRegistrationNumber')}
                                        type="text"
                                        placeholder="Business Registration Number"
                                        className="w-full p-3 text-sm outline-none bg-transparent"
                                    />
                                </div>
                                {errors.businessRegistrationNumber && <p className="text-xs text-red-500 ml-1">{errors.businessRegistrationNumber.message}</p>}
                            </div>
                        )}

                        {/* password*/}
                        <div className="space-y-1">
                            <div className={`flex items-center px-4 border rounded-xl transition-all ${errors.password ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 focus-within:border-blue-500'}`}>
                                <Lock size={18} className="text-gray-400" />
                                <input
                                    {...register('password')}
                                    type="password"
                                    placeholder="Password"
                                    className="w-full p-3 text-sm outline-none bg-transparent"
                                />
                            </div>
                            {errors.password && <p className="text-xs text-red-500 ml-1">{errors.password.message}</p>}
                        </div>

                        {!isSignUp && (
                            <div className="text-right">
                                <button type="button" className="text-xs text-blue-600 hover:underline">
                                    Forgot Password?
                                </button>
                            </div>
                        )}

                        {/* submit-btn */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                isSignUp ? 'Create Account' : 'Sign In'
                            )}
                        </button>
                    </form>

                    {/* toggle-btn */}
                    <div className="mt-8 text-center text-sm text-gray-600">
                        {isSignUp ? "Already have an account?" : "Don't have an account?"}{' '}
                        <button
                            onClick={toggleMode}
                            className="text-blue-600 font-bold hover:underline"
                        >
                            {isSignUp ? 'Log In' : 'Sign Up'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;