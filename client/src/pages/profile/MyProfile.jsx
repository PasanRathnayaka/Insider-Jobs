import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { assets } from '../../assets/assets'
import { useAuth } from '../../context/AuthProvider';

const MyProfile = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');
    const [responseSuccess, setResponseSuccess] = useState(false);
    const fileInputRef = useRef(null);

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    // Handle file selection and display preview
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Basic client-side validation
            if (!file.type.startsWith('image/')) {
                setResponseMessage('Error: Only image files are allowed!');
                setResponseSuccess(false);
                setSelectedFile(null);
                setPreviewUrl(null);
                return;
            }
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                setResponseMessage('Error: File size exceeds 2MB limit.');
                setResponseSuccess(false);
                setSelectedFile(null);
                setPreviewUrl(null);
                return;
            }

            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file)); // Create local URL for preview
            setResponseMessage(''); // Clear previous messages
            setResponseSuccess(false);
        } else {
            setSelectedFile(null);
            setPreviewUrl(null);
            setResponseMessage('');
            setResponseSuccess(false);
        }
    };

    // Handle the explicit upload button click
    const handleUploadClick = async () => {
        if (!selectedFile) {
            setResponseMessage('Please select an image first.');
            setResponseSuccess(false);
            return;
        }

        const formData = new FormData();
        formData.append('profileImage', selectedFile); // 'profileImage' must match backend Multer field name
        //formData.append('userId', dummyUserId); // If your backend filename needs userId

        try {
            setResponseMessage('Uploading...');
            setResponseSuccess(false);

            const response = await axios.post(
                'http://localhost:5000/api/users/upload-profile-picture', // Matches your backend route
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Axios usually sets this correctly
                    },
                }
            );

            // Backend confirmed success
            setResponseMessage(`Success: ${response.data.message} Stored as: ${response.data.fileName}`);
            setResponseSuccess(true);
            console.log('Frontend received success:', response.data);

            // Optional: If you wanted to show the *uploaded* image,
            // update previewUrl with the actual fileUrl from backend response:
            // setPreviewUrl(`http://localhost:5000${response.data.fileUrl}`);


        } catch (error) {
            console.error('Frontend encountered upload error:', error.response|| error);
            setResponseMessage(`Error: ${error.response?.data?.message || 'Upload failed.'}`);
            setResponseSuccess(false);
            // Revert preview if needed
            // setPreviewUrl(null);
        } finally {
            // Clear the file input value so that selecting the same file again triggers change event
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            setSelectedFile(null); // Clear selected file state
        }
    };



    return (

        <>
            <div className='mb-6'>
                <p className='text-3xl'>Welcome, User</p>
            </div>


            <div className='flex flex-col border border-gray-200 rounded-md space-y-1 px-2'>
                <div className='flex items-center justify-between p-4'>
                    <span>Profile Picture</span>

                    <div className='flex items-center gap-4'>
                        <div className='text-center p-2 rounded-full hover:bg-gray-100 hover:ease-in-out' onClick={handleImageClick}>
                            <img
                                className='cursor-pointer size-16 rounded-full object-cover'
                                src={`${previewUrl ? previewUrl : assets.profile_img}`}
                                alt=""
                            />

                            <input
                                type='file'
                                ref={fileInputRef}
                                className='hidden'
                                accept='image/*'
                                onChange={handleFileChange}
                            />
                        </div>

                        <div>
                            <button
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

                <div className='flex items-center justify-between px-4 py-4'>
                    <span>Name</span>
                    <p className='text-gray-500'>My Name</p>

                    <div>
                        <img
                            className='cursor-pointer'
                            src={assets.right_arrow_icon}
                            alt=""
                        />
                    </div>
                </div>
                <hr className='text-gray-200' />

                <div className='flex items-center justify-between px-4 py-4'>
                    <span>Email</span>
                    <p className='text-gray-500'>My Email</p>

                    <div>
                        <img
                            className='cursor-pointer'
                            src={assets.right_arrow_icon}
                            alt=""
                        />
                    </div>
                </div>
                <hr className='text-gray-200' />
            </div>
        </>

    )
}

export default MyProfile