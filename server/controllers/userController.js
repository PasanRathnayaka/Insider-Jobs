import multer from 'multer';
import path from 'path';
import fs from 'fs/promises'; // For deleting old files
import { User } from '../models/User.js';



// --- Multer Configuration for Profile Picture Uploads ---
const profileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        // This is where the file will be saved on your local disk
        const uploadPath = path.resolve('uploads/profiles');
        console.log(`[BACKEND LOG] Destination path for Multer: ${uploadPath}`);
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        // Generate a unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        const newFilename = `temp-upload-${uniqueSuffix}${fileExtension}`;
        console.log(`[BACKEND LOG] Generated filename for Multer: ${newFilename}`);
        cb(null, newFilename);
    }
});

const profileFileFilter = (req, file, cb) => {
    // Only allow image files
    if (file.mimetype.startsWith('image/')) {
        console.log(`[BACKEND LOG] File type acceptable: ${file.mimetype}`);
        cb(null, true);
    } else {
        console.log(`[BACKEND LOG] File type rejected: ${file.mimetype}`);
        cb(new Error('Only image files are allowed!'), false);
    }
};

export const uploadProfileImageMiddleware = multer({
    storage: profileStorage,
    fileFilter: profileFileFilter,
    limits: {
        fileSize: 1024 * 1024 * 2 // 2 MB limit
    }
}).single('profileImage'); // Expecting a single file with form field name 'profileImage'

// --- Controller Function to VERIFY UPLOAD (simplified) ---
export const verifyProfilePictureUpload = async (req, res) => {
    try {
        if (!req.file) {
            console.log(`[BACKEND LOG] Upload failed: No file received or file type not allowed.`);
            return res.status(400).json({
                success: false,
                message: 'No image uploaded or invalid file type detected by Multer.'
            });
        }

        // If req.file exists, Multer successfully processed and stored the file
        console.log(`[BACKEND LOG] File successfully received and saved to: ${req.file.path}`);
        console.log(`[BACKEND LOG] Original filename: ${req.file.originalname}`);
        console.log(`[BACKEND LOG] Stored filename: ${req.file.filename}`);
        console.log(`[BACKEND LOG] File size: ${req.file.size} bytes`);
        console.log(`[BACKEND LOG] File MIME type: ${req.file.mimetype}`);


        // In a real application, you would now update your database here:
        // const user = await User.findById(req.params.userId); // Assuming userId is passed
        // user.profilePicture = req.file.filename;
        // await user.save();
        // console.log(`[BACKEND LOG] Database updated for user with new profile picture.`);

        res.status(200).json({
            success: true,
            message: 'Profile picture successfully received by backend and saved!',
            fileName: req.file.filename,
            fileSize: req.file.size,
            fileType: req.file.mimetype,
            // Provide a URL that the frontend could use to view the file
            fileUrl: `/uploads/profiles/${req.file.filename}`
        });

    } catch (error) {
        console.error(`[BACKEND LOG] Error in verifyProfilePictureUpload: ${error.message}`);
        // Handle specific Multer errors
        if (error instanceof multer.MulterError) {
            if (error.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ success: false, message: 'File too large. Max 2MB.' });
            }
            if (error.code === 'LIMIT_UNEXPECTED_FILE') {
                return res.status(400).json({ success: false, message: 'Unexpected field name or too many files.' });
            }
        }
        // Handle error from fileFilter
        if (error.message === 'Only image files are allowed!') {
            return res.status(400).json({ success: false, message: error.message });
        }
        res.status(500).json({ success: false, message: 'Server error during file processing.' });
    }
};