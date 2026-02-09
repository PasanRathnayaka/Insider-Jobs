import { useRef, useState, useEffect } from 'react'
import axios from 'axios';
import { assets } from '../../assets/assets'
import { useAuth } from '../../context/AuthProvider';
import { useForm } from 'react-hook-form';
import { Edit, X } from 'lucide-react';
import { editProfileSchema } from '../../schemas/profileSchema';
import { zodResolver } from '@hookform/resolvers/zod';


const MyProfile = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');
    const [responseSuccess, setResponseSuccess] = useState(false);

    const [isNameEditing, setIsNameEditing] = useState(false);
    const [isEmailEditing, setIsEmailEditing] = useState(false);

    const fileInputRef = useRef(null);

    const { user } = useAuth();

    const form = useForm({
        resolver: zodResolver(editProfileSchema),
        defaultValues: {
            username: user?.username ?? "",
            email: user?.email ?? "",
        }
    });

    const {
        handleSubmit,
        register,
        reset,
        formState: { isDirty, errors }
    } = form;


    useEffect(() => {
        form.reset({
            username: user?.username ?? "",
            email: user?.email ?? "",
        });
    }, [user]);

    const handleImageClick = () => {
        fileInputRef.current.click();
    };


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setResponseMessage('Error: Only image files are allowed!');
                setResponseSuccess(false);
                setSelectedFile(null);
                setPreviewUrl(null);
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                setResponseMessage('Error: File size exceeds 2MB limit.');
                setResponseSuccess(false);
                setSelectedFile(null);
                setPreviewUrl(null);
                return;
            }

            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setResponseMessage('');
            setResponseSuccess(false);
        } else {
            setSelectedFile(null);
            setPreviewUrl(null);
            setResponseMessage('');
            setResponseSuccess(false);
        }
    };

    const handleUploadClick = async () => {
        if (!selectedFile) {
            setResponseMessage('Please select an image first.');
            setResponseSuccess(false);
            return;
        }

        const formData = new FormData();
        formData.append('profileImage', selectedFile);

        try {
            setResponseMessage('Uploading...');
            setResponseSuccess(false);

            const response = await axios.post(
                'http://localhost:5000/api/users/upload-profile-picture',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            setResponseMessage(`Success: ${response.data.message} Stored as: ${response.data.fileName}`);
            setResponseSuccess(true);
            console.log('Frontend received success:', response.data);


        } catch (error) {
            console.error('Frontend encountered upload error:', error.response || error);
            setResponseMessage(`Error: ${error.response?.data?.message || 'Upload failed.'}`);
            setResponseSuccess(false);

        } finally {
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            setSelectedFile(null);
        }
    };

    const onSubmit = (data) => {
        console.log("data to be editted: ", data);

        reset(data);
        setIsNameEditing(false);
        setIsEmailEditing(false);
    };


    return (

        <>
            <div className='mb-6'>
                <p className='text-3xl'>
                    Welcome, {user?.name ?? user?.email?.split("@")[0] ?? "User"}
                </p>
            </div>


            <div className='flex flex-col border border-gray-200 rounded-md space-y-1 px-2'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex items-center justify-between p-4'>
                        <span>Profile Picture</span>

                        {/* profile-image */}
                        <div className='flex items-center gap-4'>
                            <button type="button" onClick={handleImageClick}>
                                <div className='text-center p-2 rounded-full hover:bg-gray-100 hover:ease-in-out'>
                                    <img
                                        className='cursor-pointer size-16 rounded-full object-cover'
                                        src={`${previewUrl ? previewUrl : assets.profile_img}`}
                                        alt="profile-image"
                                    />

                                    <input
                                        type='file'
                                        ref={fileInputRef}
                                        className='hidden'
                                        accept='image/*'
                                        onChange={handleFileChange}
                                    />
                                </div>
                            </button>

                            <div>
                                <button
                                    type="button"
                                    className='px-3 py-1 text-sm rounded-full bg-sky-100 hover:bg-sky-200 hover:delay-75 ease-in-out cursor-pointer'
                                    onClick={handleUploadClick}
                                    disabled={!selectedFile}
                                >
                                    Update
                                </button>
                            </div>

                            {responseMessage && (
                                <p style={{ color: responseSuccess ? 'green' : 'red', fontWeight: 'bold', marginTop: '15px' }}>
                                    {responseMessage}
                                </p>
                            )}
                        </div>

                    </div>
                    <hr className='text-gray-200' />

                    {/* username */}
                    <div className='flex items-center justify-between px-4 py-4'>
                        <span>Name</span>

                        <input
                            className={`w-xl mx-auto p-2 ${!isNameEditing
                                ? 'bg-transparent border-none p-0 text-gray-500'
                                : 'border border-gray-300 rounded'
                                }`}
                            type='text'
                            {...register("username")}
                            readOnly={!isNameEditing}
                            defaultValue={user?.username ?? user?.email?.split("@")[0] ?? "My Name"}
                        />

                        {isNameEditing ? (
                            <button
                                type="button"
                                onClick={() => {
                                    setIsNameEditing(false)
                                    reset()
                                }}
                            >
                                <X
                                    size={22}
                                    className='cursor-pointer text-gray-400 hover:text-gray-500'
                                />
                            </button>
                        ) : (
                            <button type="button" onClick={() => setIsNameEditing(true)}>
                                <Edit
                                    size={22}
                                    className='cursor-pointer text-gray-400 hover:text-gray-500'
                                />
                            </button>
                        )}
                    </div>

                    <hr className='text-gray-200' />

                    {/* email */}
                    <div className='flex items-center justify-between px-4 py-4'>
                        <span>Email</span>

                        <div className='flex flex-col'>
                            <input
                                className={`w-xl mx-auto p-2 ${!isEmailEditing
                                    ? 'bg-transparent border-none p-0 text-gray-500'
                                    : 'border border-gray-300 rounded'
                                    }`}
                                type='text'
                                {...register("email")}
                                readOnly={!isEmailEditing}
                                defaultValue={user?.email ?? "My Email"}
                            />
                            {errors &&
                                <p className='text-red-500 text-sm'>{errors?.email?.message}</p>
                            }

                        </div>

                        {isEmailEditing ? (
                            <button
                                type="button"
                                onClick={() => {
                                    setIsEmailEditing(false)
                                    reset()
                                }}
                            >
                                <X
                                    size={22}
                                    className='cursor-pointer text-gray-400 hover:text-gray-500'
                                />
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setIsEmailEditing(true)}
                            >
                                <Edit
                                    size={22}
                                    className='cursor-pointer text-gray-400 hover:text-gray-500'
                                />
                            </button>
                        )}

                    </div>

                    <hr className='text-gray-200' />

                    <div className='flex items-center justify-end'>
                        <button
                            type="submit"
                            disabled={!isDirty}
                            className={`w-32 p-2 my-4 rounded-full text-white ${isDirty
                                ? 'bg-blue-500 hover:bg-blue-600 cursor-pointer'
                                : 'bg-gray-300 cursor-not-allowed'}`}
                        >
                            Save Changes
                        </button>
                    </div>

                </form >
            </div>
        </>

    );
};

export default MyProfile;