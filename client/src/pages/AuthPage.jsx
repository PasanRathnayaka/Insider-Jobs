import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, User, Building2, X, Briefcase, UserCircle, Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { loginSchema, registerSchema } from '../schemas/authSchema';
import { useAuth } from '../context/AuthProvider';



const AuthPage = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [selectedRole, setSelectedRole] = useState('jobseeker');
    const { handleLogin, isLoading, error, clearErrors } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(isSignUp ? registerSchema : loginSchema),
        defaultValues: {
            role: 'jobseeker',
            email: '',
            password: '',
            name: '',
            businessRegistrationNumber: ''
        }
    });

    const toggleMode = () => {
        setIsSignUp(!isSignUp);
        reset({
            role: selectedRole,
            email: '',
            password: '',
            name: '',
            businessRegistrationNumber: ''
        });
    };

    const handleRoleChange = (role) => {
        setSelectedRole(role);
        setValue('role', role);
    };

    const onSubmit = async (data) => {
        console.log("Form Data Submitted:", data);
        reset();
        clearErrors();
        handleLogin({
            email: data.email,
            password: data.password
        });
    };

    return (
        <div className="min-h-screen w-full flex bg-white font-sans selection:bg-purple-200">

            {/* left-col */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-20">
                <div className="w-full max-w-md">
                    {/* mobile-logo*/}
                    <div className="lg:hidden mb-8">
                        <div className="flex items-center gap-2 text-purple-800 font-bold text-2xl">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-800 to-black flex items-center justify-center text-white">
                                <Briefcase size={24} />
                            </div>
                            Insider Jobs
                        </div>
                    </div>

                    <div className="mb-10">
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                            {isSignUp ? 'Create account' : 'Welcome back'}
                        </h1>
                        <p className="text-gray-500 mt-3 text-lg">
                            {isSignUp
                                ? 'Start your journey with us today.'
                                : 'Enter your details to access your dashboard.'}
                        </p>
                    </div>

                    <div className="flex p-1.5 bg-gray-100 rounded-2xl mb-8">
                        <button
                            type="button"
                            onClick={() => handleRoleChange('jobseeker')}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold rounded-xl transition-all cursor-pointer ${selectedRole === 'jobseeker'
                                ? 'bg-white text-purple-900 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <UserCircle size={20} />
                            Job Seeker
                        </button>
                        <button
                            type="button"
                            onClick={() => handleRoleChange('recruiter')}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold rounded-xl transition-all cursor-pointer ${selectedRole === 'recruiter'
                                ? 'bg-white text-purple-900 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <Building2 size={20} />
                            Recruiter
                        </button>
                    </div>

                    {error &&
                        <div className='flex items-center justify-between px-4 py-3 mb-4 border border-red-400 bg-red-100 rounded-xl'>
                            <p className='text-red-500'>{error}</p>
                            <button
                                className='text-slate-500 cursor-pointer'
                                onClick={clearErrors}
                            >
                                X
                            </button>
                        </div>
                    }

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* name */}
                        {isSignUp && (
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
                                <div className={`flex items-center px-4 bg-gray-50 border-2 rounded-2xl transition-all ${errors.name ? 'border-red-400' : 'border-gray-50 focus-within:border-purple-600 focus-within:bg-white'}`}>
                                    <User size={19} className="text-gray-400" />
                                    <input
                                        {...register('name')}
                                        type="text"
                                        placeholder="e.g. John Doe"
                                        className="w-full p-4 text-sm outline-none bg-transparent text-gray-800"
                                    />
                                </div>
                                {errors.name && <p className="text-xs text-red-500 font-medium ml-1">{errors.name.message}</p>}
                            </div>
                        )}

                        {/* email */}
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                            <div className={`flex items-center px-4 bg-gray-50 border-2 rounded-2xl transition-all ${errors.email ? 'border-red-400' : 'border-gray-50 focus-within:border-purple-600 focus-within:bg-white'}`}>
                                <Mail size={19} className="text-gray-400" />
                                <input
                                    {...register('email')}
                                    type="email"
                                    placeholder="name@company.com"
                                    className="w-full p-4 text-sm outline-none bg-transparent text-gray-800"
                                />
                            </div>
                            {errors.email && <p className="text-xs text-red-500 font-medium ml-1">{errors.email.message}</p>}
                        </div>

                        {/* business-registration-number */}
                        {isSignUp && selectedRole === 'recruiter' && (
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700 ml-1">Business Reg. Number</label>
                                <div className={`flex items-center px-4 bg-gray-50 border-2 rounded-2xl transition-all ${errors.businessRegistrationNumber ? 'border-red-400' : 'border-gray-50 focus-within:border-purple-600 focus-within:bg-white'}`}>
                                    <Briefcase size={19} className="text-gray-400" />
                                    <input
                                        {...register('businessRegistrationNumber')}
                                        type="text"
                                        placeholder="BRN-000000"
                                        className="w-full p-4 text-sm outline-none bg-transparent text-gray-800"
                                    />
                                </div>
                                {errors.businessRegistrationNumber && <p className="text-xs text-red-500 font-medium ml-1">{errors.businessRegistrationNumber.message}</p>}
                            </div>
                        )}

                        {/* password */}
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
                            <div className={`flex items-center px-4 bg-gray-50 border-2 rounded-2xl transition-all ${errors.password ? 'border-red-400' : 'border-gray-50 focus-within:border-purple-600 focus-within:bg-white'}`}>
                                <Lock size={19} className="text-gray-400" />
                                <input
                                    {...register('password')}
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full p-4 text-sm outline-none bg-transparent text-gray-800"
                                />
                            </div>
                            {errors.password && <p className="text-xs text-red-500 font-medium ml-1">{errors.password.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 mt-4 bg-purple-800 text-white rounded-2xl font-bold hover:bg-purple-900 transition-all shadow-xl shadow-purple-200 flex items-center justify-center gap-3 cursor-pointer disabled:opacity-80 active:scale-[0.98]"
                        >
                            {isSubmitting ? (
                                <Loader2 size={20} className="animate-spin" />
                            ) : (
                                <>
                                    {isSignUp ? 'Create Account' : 'Sign In'}
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* toggle-btn */}
                    <div className="mt-10 text-center">
                        <p className="text-gray-500 font-medium">
                            {isSignUp ? "Already have an account?" : "New to the platform?"}{' '}
                            <button
                                onClick={toggleMode}
                                className="text-purple-800 font-extrabold hover:text-purple-950 transition-colors underline underline-offset-4"
                            >
                                {isSignUp ? 'Log In' : 'Join Now'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            {/* right-col */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-r from-purple-800 via-purple-950 to-black relative overflow-hidden items-center justify-center">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl -mr-64 -mt-64"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/40 rounded-full blur-3xl -ml-64 -mb-64"></div>

                <div className="relative z-10 p-16 max-w-2xl text-white">
                    {/* logo */}
                    <div className="flex items-center gap-3 mb-16">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl">
                            <Briefcase size={32} className="text-white" />
                        </div>
                        <span className="text-3xl font-black tracking-tighter uppercase">Insider</span><span className="text-3xl font-black tracking-tighter uppercase">JOBS</span>
                    </div>

                    <h2 className="text-5xl font-bold leading-tight mb-8">
                        Connect with the <br />
                        <span className="text-purple-300">perfect opportunities.</span>
                    </h2>

                    <div className="space-y-6">
                        {[
                            "Browse thousands of verified job listings.",
                            "Manage your applications in one centralized dashboard.",
                            "Advanced filters for location, salary, and job level.",
                            "Quick and secure hiring process for recruiters."
                        ].map((text, idx) => (
                            <div key={idx} className="flex items-center gap-4 group">
                                <div className="p-1 rounded-full bg-purple-400/20 group-hover:bg-purple-400/40 transition-colors">
                                    <CheckCircle2 size={20} className="text-purple-300" />
                                </div>
                                <p className="text-lg text-gray-200 font-light">{text}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10">
                        <p className="italic text-gray-300 text-lg mb-4">
                            "Finding my dream role at TechNova was seamless. The status tracking feature kept me informed every step of the way!"
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-400 to-purple-600"></div>
                            <div>
                                <p className="font-bold text-white">Alex Johnson</p>
                                <p className="text-sm text-purple-300">Software Engineer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;