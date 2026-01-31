import React, { useEffect, useRef, useState } from 'react'
import { assets } from '../assets/assets'
import { useAuth } from '../context/AuthProvider'
import { useNavigate, } from 'react-router-dom';


const AuthModal = () => {

    const [isSignUpClicked, setIsSignUpClicked] = useState(false);
    const [selectedRadioValue, setSelectedRadioValue] = useState("");
    const [triggerBtnClicked, setTriggerBtnClicked] = useState("")

    const [formData, setFormData] = useState(
        {
            username: "",
            email: "",
            password: ""
        }
    );


    const handleChange = (e) => {
        // if (!usernameRef.current && emailRef.current && passwordRef.current) {
        //     setFormData(
        //         {
        //             username: "",
        //             email: emailRef.current.value,
        //             password: passwordRef.current.value
        //         }
        //     );
        // }
        // else {
        //     setFormData(
        //         {
        //             username: usernameRef.current.value,
        //             email: emailRef.current.value,
        //             password: passwordRef.current.value

        //         }
        //     );
        // }

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
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

                signup({ ...formData, userType: selectedRadioValue });

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

                emailRef.current.value = ""
                passwordRef.current.value = ""

                closeAuthModal();
            }
        }
    }

    // useEffect(() => {
    //     const triggerOutsideClick = (e) => {
    //         if (authModalRef.current && !authModalRef.current.contains(e.target)) {
    //             closeAuthModal();
    //             addUserRole(null);
    //         }
    //     }

    //     document.addEventListener("mousedown", triggerOutsideClick);

    //     if (isAuthModalOpen) {
    //         document.body.classList.add("overflow-hidden");
    //     }

    //     return () => {
    //         document.removeEventListener("mousedown", triggerOutsideClick);
    //         document.body.classList.remove("overflow-hidden");
    //     }
    // }, [isAuthModalOpen, closeAuthModal, addUserRole]);




    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 ${isAuthModalOpen ? "block" : "hidden"}`}>

            {/* Auth Modal */}
            <div className='pt-5 pb-8 px-10 rounded-xl shadow-sm bg-white' ref={authModalRef}>

                <div className='flex items-center justify-end mb-3'>
                    <button className='p-2 rounded-full hover:bg-gray-200 cursor-pointer' onClick={() => { closeAuthModal(); setSelectedRadioValue("") }}>
                        <img className='cursor-pointer size-3' src={assets.cross_icon} alt="" />
                    </button>
                </div>

                <p className='text-xl text-center'>{`${isSignUpClicked ? "Sign Up" : "Log In"}`}</p>
                <p className='text-sm text-gray-400 mt-2 text-center'>Welcome back! Please sign in to continue</p>

                <form onSubmit={handleSubmit}>
                    <div className='mt-8 flex flex-col w-full space-y-2'>

                        {isSignUpClicked && (
                            <>
                                <div className={`flex items-center px-3 border rounded-ful border-gray-300`}>
                                    <img src={assets.person_icon} alt="" />
                                    <input className='py-2 px-2 text-sm outline-0' type="text" name="username" placeholder='Username' ref={usernameRef} onChange={handleChange} required/>
                                </div>
                            </>
                        )}

                        <div className={`flex items-center px-3 border rounded-full border-gray-300`}>
                            <img src={assets.email_icon} alt="" />
                            <input className='py-2 px-2 text-sm outline-0' type="email" name="email" placeholder='Email' ref={emailRef} onChange={handleChange} required/>
                        </div>

                        <div className={`flex items-center px-3 border rounded-full mb-4 border-gray-300`}>
                            <img src={assets.lock_icon} alt="" />
                            <input className='py-2 px-2 text-sm outline-0' type="password" name="password" placeholder='Password' ref={passwordRef} onChange={handleChange} required/>
                        </div>

                        {isSignUpClicked &&

                            [{ key: "user", text: "I'm a job seeker" }, { key: "recruiter", text: "I'm a recruiter" }].map((option) => (
                                <label
                                    key={option.key}
                                    className='flex items-center w-full'
                                >
                                    <input
                                        type="radio"
                                        name="userType"
                                        value={option.key}
                                        checked={selectedRadioValue === option.key}
                                        onChange={() => setSelectedRadioValue(option.key)}
                                        className="hidden peer"
                                        required
                                    />

                                    <span className="size-4 rounded-full border border-gray-400 peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-100 mr-3">
                                    </span>

                                    <span className='text-sm text-gray-500'>{option.text}</span>
                                </label>
                            ))
                        }


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

                        <p className='text-sm text-gray-500 text-center mt-3'>{`${isSignUpClicked ? "Back to login ?" : "Don't have an account ?"}`} <a className='text-blue-500 font-semibold hover:text-blue-700 underline cursor-pointer' onClick={triggerSignUpClicked}>{`${isSignUpClicked ? "Log In" : "Sign up"}`}</a></p>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default AuthModal