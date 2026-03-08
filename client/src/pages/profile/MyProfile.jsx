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

            setResponseMessage(`Success: ${response.data.message}`);
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

        <div className='w-full max-w-4xl mx-auto'>
            <div className='mb-6 md:mb-8'>
                <p className='text-2xl md:text-3xl font-semibold text-gray-800 tracking-tight'>
                    Welcome, {user?.name ?? user?.email?.split("@")[0] ?? "User"}
                </p>
            </div>

            <div className='bg-white flex flex-col border border-gray-100 shadow-sm rounded-xl overflow-hidden'>
                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* profile-image */}
                    <div className='flex flex-col md:flex-row md:items-center justify-between p-5 md:p-8 gap-6'>
                        <span className='font-medium text-gray-700 md:w-1/4'>Profile Picture</span>

                        <div className='flex items-center gap-5 md:gap-8 flex-1'>
                            <button type="button" onClick={handleImageClick} className='shrink-0 group relative rounded-full'>
                                <div className='size-16 md:size-20 rounded-full overflow-hidden ring-4 ring-gray-50 group-hover:ring-blue-50 transition-all'>
                                    <img
                                        className='w-full h-full object-cover'
                                        src={`${previewUrl ? previewUrl : (user?.profileImage || assets.profile_img)}`}
                                        alt="profile-image"
                                    />
                                    <div className='absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'>
                                        <Edit className='text-white size-5 md:size-6' />
                                    </div>
                                </div>
                                <input
                                    type='file'
                                    ref={fileInputRef}
                                    className='hidden'
                                    accept='image/*'
                                    onChange={handleFileChange}
                                />
                            </button>

                            <div className='flex flex-col items-start'>
                                <button
                                    type="button"
                                    className='px-4 py-2 text-sm font-medium rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
                                    onClick={handleUploadClick}
                                    disabled={!selectedFile}
                                >
                                    Upload Image
                                </button>
                                {responseMessage && (
                                    <p className={`text-sm mt-2 font-medium ${responseSuccess ? 'text-green-600' : 'text-red-500'}`}>
                                        {responseMessage}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <hr className='border-gray-100' />

                    {/* username */}
                    <div className='flex flex-col md:flex-row md:items-center justify-between p-5 md:p-8 gap-3 md:gap-6'>
                        <span className='font-medium text-gray-700 md:w-1/4'>Name</span>

                        <div className='flex-1 flex max-md:justify-between items-center gap-4'>
                            <input
                                className={`w-full max-w-md p-2.5 outline-none transition-all ${!isNameEditing
                                    ? 'bg-transparent text-gray-800 font-medium cursor-default p-0'
                                    : 'border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white'
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
                                    className='p-2 shrink-0 bg-red-50 hover:bg-red-100 rounded-full text-red-500 transition-colors cursor-pointer'
                                >
                                    <X size={20} />
                                </button>
                            ) : (
                                <button type="button" onClick={() => setIsNameEditing(true)}
                                    className='p-2 shrink-0 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-500 hover:text-blue-500 transition-colors cursor-pointer'
                                >
                                    <Edit size={20} />
                                </button>
                            )}
                        </div>
                    </div>

                    <hr className='border-gray-100' />

                    {/* email */}
                    <div className='flex flex-col md:flex-row md:items-start justify-between p-5 md:p-8 gap-3 md:gap-6'>
                        <span className='font-medium text-gray-700 md:w-1/4 md:mt-2.5'>Email</span>

                        <div className='flex-1 flex max-md:justify-between items-start gap-4'>
                            <div className='w-full max-w-md flex flex-col'>
                                <input
                                    className={`w-full p-2.5 outline-none transition-all ${!isEmailEditing
                                        ? 'bg-transparent text-gray-800 font-medium cursor-default p-0'
                                        : 'border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white'
                                        }`}
                                    type='text'
                                    {...register("email")}
                                    readOnly={!isEmailEditing}
                                    defaultValue={user?.email ?? "My Email"}
                                />
                                {errors?.email &&
                                    <p className='text-red-500 text-sm mt-1.5 ml-1 font-medium'>{errors.email.message}</p>
                                }
                            </div>

                            {isEmailEditing ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEmailEditing(false)
                                        reset()
                                    }}
                                    className='p-2 md:mt-1 shrink-0 bg-red-50 hover:bg-red-100 rounded-full text-red-500 transition-colors cursor-pointer'
                                >
                                    <X size={20} />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setIsEmailEditing(true)}
                                    className='p-2 md:mt-1 shrink-0 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-500 hover:text-blue-500 transition-colors cursor-pointer'
                                >
                                    <Edit size={20} />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className='p-5 md:p-8 bg-gray-50/50 border-t border-gray-100 rounded-b-xl flex justify-end'>
                        <button
                            type="submit"
                            disabled={!isDirty}
                            className={`px-6 py-2.5 rounded-lg font-medium transition-all ${isDirty
                                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm cursor-pointer'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                        >
                            Save Changes
                        </button>
                    </div>

                </form>
            </div>
        </div>

    );
};

export default MyProfile;