import jwt from 'jsonwebtoken';
import bcrypt, { genSalt } from 'bcryptjs';
import { User } from '../models/User.js';
import { AppError } from '../utils/AppError.js';

export const registerUser = async (username, email, password, role) => {
    const isExistingUser = await User.findOne({ email });
    if (isExistingUser) {
        throw new AppError("User already exists", 400);
    }

    const salt = await genSalt(10);
    const hashedPswd = await bcrypt.hash(String(password), salt);

    const user = new User({
        username,
        email,
        password: hashedPswd,
        role
    });

    const isRegistered = await user.save();
    if (!isRegistered) {
        throw new AppError("Registration failed. Please try again", 400);
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "30min" });

    return { user, token };
};

export const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError("User Not Found", 404);
    }

    const psw = await bcrypt.compare(password, user.password);
    if (!psw) {
        throw new AppError("Incorrect Password", 400);
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "30min" });

    const userData = {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        imageURL: user.imageURL,
    };

    return { user: userData, token };
};
