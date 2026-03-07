import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { AppError } from '../utils/AppError.js';

export const getProfileData = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError("User Not Found", 404);
    }

    return {
        id: user.id,
        role: user.role,
        username: user.username,
        email: user.email,
        imageURL: user.imageURL,
    };
};

export const updateProfile = async (userId, username) => {
    const user = await User.findByIdAndUpdate(userId, { username }, { new: true });
    if (!user) {
        throw new AppError("User Not Found", 404);
    }
    return user;
};

export const deleteProfile = async (userId) => {
    const result = await User.findByIdAndDelete(userId);
    if (!result) {
        throw new AppError("User Not Found", 404);
    }
    return result;
};

export const changePassword = async (userId, password) => {
    const hashedPswd = await bcrypt.hash(password, 10);
    const result = await User.findByIdAndUpdate(userId, { password: hashedPswd });
    if (!result) {
        throw new AppError("User Not Found", 404);
    }
    return result;
};

export const updateProfileImage = async (userId, imageURL) => {
    const user = await User.findByIdAndUpdate(userId, { imageURL }, { new: true });
    if (!user) {
        throw new AppError("User Not Found", 404);
    }
    return user;
};
