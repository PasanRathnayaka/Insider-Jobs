import React, { useEffect, useRef, useState } from 'react'
import { assets } from '../assets/assets'
import { useAuth } from '../context/AuthProvider'
import { Navigate, useNavigate, } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const AuthModal = () => {

    const [isSignUpClicked, setIsSignUpClicked] = useState(false);
    const [triggerBtnClicked, setTriggerBtnClicked] = useState("");
    const [fetchedToken, setFetchedToken] = useState(null);
    const navigate = useNavigate();

    const [formData, setFormData] = useState(
        {
            username: "",
            email: "",
            password: ""
        }
    )

    const handleChange = () => {
        if (!usernameRef.current && emailRef.current && passwordRef.current) {
            setFormData(
                {
                    username: "",
                    email: emailRef.current.value,
                    password: passwordRef.current.value
                }
            );
        }
        else {
            setFormData(
                {
                    username: usernameRef.current.value,
                    email: emailRef.current.value,
                    password: passwordRef.current.value

                }
            );
        }

    }

    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const signupBtnRef = useRef(null);

    const authModalRef = useRef(null);

    const { isAuthModalOpen, closeAuthModal, signup, login, logout, userRole, addUserRole } = useAuth();

    const triggerSignUpClicked = () => {
        setIsSignUpClicked(!isSignUpClicked);
    }

    const handleSubmit = (e) => {

        if (triggerBtnClicked === "signup") {

            if (!usernameRef.current.value && !emailRef.current.value && !passwordRef.current.value) {
                e.preventDefault();
                console.log("provide all fields");
            }
            else if (usernameRef.current.value && !emailRef.current.value && !passwordRef.current.value) {
                e.preventDefault();
                console.log("provide email && password");
            }
            else if (!usernameRef.current.value && emailRef.current.value && !passwordRef.current.value) {
                e.preventDefault();
                console.log("provide username && password");
            }
            else if (!usernameRef.current.value && !emailRef.current.value && passwordRef.current.value) {
                e.preventDefault();
                console.log("provide username && email");
            }
            else if (usernameRef.current.value && emailRef.current.value && !passwordRef.current.value) {
                e.preventDefault();
                console.log("provide password");
            }
            else if (!usernameRef.current.value && emailRef.current.value && passwordRef.current.value) {
                e.preventDefault();
                console.log("provide username");
            }
            else if (usernameRef.current.value && !emailRef.current.value && passwordRef.current.value) {
                e.preventDefault();
                console.log("provide email");
            }
            else {
                e.preventDefault();

                signup({ ...formData, role: userRole ? userRole : "user" });

                usernameRef.current.value = ""
                emailRef.current.value = ""
                passwordRef.current.value = ""

                setFormData(
                    {
                        username: "",
                        email: "",
                        password: ""
                    }
                );

                closeAuthModal();
            }
        }

        if (triggerBtnClicked === "login") {

            if (!emailRef.current.value && !passwordRef.current.value) {
                e.preventDefault();
                console.log("Enter email and password");
            }
            else if (emailRef.current.value && !passwordRef.current.value) {
                e.preventDefault();
                console.log("Enter password");
            }
            else if (!emailRef.current.value && passwordRef.current.value) {
                e.preventDefault();
                console.log("Enter email");
            }
            else {
                e.preventDefault();
                login(formData);
                // (async () => {
                //     const res = await login(formData);
                //     console.log("Result after calling login():", res);
                //     if(res){
                //        setIsLoggedIn(true);
                //     }
                // })();

                emailRef.current.value = ""
                passwordRef.current.value = ""

                closeAuthModal();
            }
        }
    }

    // useEffect(() => {
    //     const intervalID = setInterval(() => {
    //         const token = localStorage.getItem("token");

    //         if (token) {
    //             setFetchedToken(token);
    //         }
    //     }, 2000)

    //     return () => clearInterval(intervalID);
    // }, [])


    // useEffect(() => {

    //     if (fetchedToken) {
    //         console.log("FETCHED TOKEN: ", fetchedToken);
    //         const decoded = jwtDecode(fetchedToken);
    //         console.log("DECODED ROLE: ", decoded);

    //         const userRole = decoded.role;
    //         console.log("USER ROLE: ", userRole);

    //         if (userRole === "user") {
    //            return navigate("/apply-job");
    //         }
    //         else if (userRole === "recruiter") {
    //            return navigate("/recruiter");
    //         }
    //         else {
    //            return navigate("/");
    //         }
    //     }

    // }, [fetchedToken])



    // useEffect(() => {
    //     setFetchedToken(null);
    // }, [logout])


    console.log("form data: ", formData);
    //console.log("user data: ", userData);
    //console.log("login credentials: ", loginCredentials);

    useEffect(() => {
        const triggerOutsideClick = (e) => {
            if (authModalRef.current && !authModalRef.current.contains(e.target)) {
                closeAuthModal();
                addUserRole(null);
            }
        }

        document.addEventListener("mousedown", triggerOutsideClick);

        if (isAuthModalOpen) {
            document.body.classList.add("overflow-hidden");
        }

        return () => {
            document.removeEventListener("mousedown", triggerOutsideClick);
            document.body.classList.remove("overflow-hidden");
        }
    }, [isAuthModalOpen, closeAuthModal, addUserRole]);




    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 ${isAuthModalOpen ? "block" : "hidden"}`}>

            {/* Auth Modal */}
            <div className='pt-5 pb-8 px-10 rounded-xl shadow-sm bg-white' ref={authModalRef}>

                <div className='flex items-center justify-end mb-3'>
                    <button className='p-2 rounded-full hover:bg-gray-200 cursor-pointer' onClick={closeAuthModal}>
                        <img className='cursor-pointer size-3' src={assets.cross_icon} alt="" />
                    </button>
                </div>

                <p className='text-xl text-center'>{`${isSignUpClicked ? "Sign Up" : "Log In"}`}</p>
                <p className='text-sm text-gray-400 mt-2 text-center'>Welcome back! Please sign in to continue</p>

                <form method='POST' onSubmit={handleSubmit}>
                    <div className='mt-8 flex flex-col w-full space-y-2'>

                        {isSignUpClicked && (
                            <>
                                <div className={`flex items-center px-3 border rounded-full ${!formData.username && triggerBtnClicked === 'signup' ? 'border-red-400' : ' border-gray-300'}`}>
                                    <img src={assets.person_icon} alt="" />
                                    <input className='py-2 px-2 text-sm outline-0' type="text" name="username" placeholder='Username' ref={usernameRef} onChange={handleChange} />
                                </div>
                                <p className={`text-red-400 text-sm ml-4 mb-2 ${!formData.username && triggerBtnClicked === 'signup' ? 'block' : 'hidden'}`}>Username is required</p>
                            </>
                        )}

                        <div className={`flex items-center px-3 border rounded-full ${!formData.email && (triggerBtnClicked === 'signup' || triggerBtnClicked === 'login') ? 'border-red-400' : ' border-gray-300'}`}>
                            <img src={assets.email_icon} alt="" />
                            <input className='py-2 px-2 text-sm outline-0' type="email" name="email" placeholder='Email' ref={emailRef} onChange={handleChange} />
                        </div>
                        <p className={`text-red-400 text-sm ml-4 mb-2 ${!formData.email && (triggerBtnClicked === 'signup' || triggerBtnClicked === 'login') ? 'block' : 'hidden'}`}>Email is required</p>

                        <div className={`flex items-center px-3 border rounded-full ${!formData.password && (triggerBtnClicked === 'signup' || triggerBtnClicked === 'login') ? 'border-red-400' : ' border-gray-300'}`}>
                            <img src={assets.lock_icon} alt="" />
                            <input className='py-2 px-2 text-sm outline-0' type="password" name="password" placeholder='Password' ref={passwordRef} onChange={handleChange} />
                        </div>
                        <p className={`text-red-400 text-sm ml-4 mb-2 ${!formData.password && (triggerBtnClicked === 'signup' || triggerBtnClicked === 'login') ? 'block' : 'hidden'}`}>Password is required</p>

                        <p className='text-sm text-blue-500 mt-3 hover:underline cursor-pointer'>Forgot Password ?</p>

                        <button
                            type='submit'
                            onClick={() => { setTriggerBtnClicked("signup") }}
                            ref={signupBtnRef}
                            className={`py-2 px-4 rounded-full bg-blue-600 text-white hover:bg-blue-700 cursor-pointer ${isSignUpClicked ? "block" : "hidden"}`}
                        >
                            Signup
                        </button>

                        <button
                            type='submit'
                            onClick={() => { setTriggerBtnClicked("login") }}
                            className={`py-2 px-4 rounded-full bg-blue-600 text-white hover:bg-blue-700 cursor-pointer ${isSignUpClicked ? "hidden" : "block"}`}
                        >
                            Login
                        </button>

                        <p className='text-sm text-gray-500 text-center'>{`${isSignUpClicked ? "Back to login ?" : "Don't have an account ?"}`} <a className='text-blue-500 font-semibold hover:text-blue-700 underline cursor-pointer' onClick={triggerSignUpClicked}>{`${isSignUpClicked ? "Log In" : "Sign up"}`}</a></p>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default AuthModal