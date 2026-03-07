import jwt from 'jsonwebtoken';
import bcrypt, { genSalt } from 'bcryptjs';
import { User } from '../models/User.js';
import { RefreshToken } from '../models/RefreshToken.js';
import { AppError } from '../utils/AppError.js';


const generateAuthTokens = async (user) => {
    const accessToken = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
    );

    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    const refreshToken = jwt.sign(
        { id: user._id },
        refreshTokenSecret,
        { expiresIn: "7d" }
    );

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await RefreshToken.create({
        token: refreshToken,
        user: user._id,
        expiresAt
    });

    return { accessToken, refreshToken };
};


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

    const tokens = await generateAuthTokens(user);

    return { user, ...tokens };
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

    const tokens = await generateAuthTokens(user);

    const userData = {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        imageURL: user.imageURL,
    };

    return { user: userData, ...tokens };
};

export const logoutUser = async (refreshToken) => {
    if (refreshToken) {
        await RefreshToken.deleteOne({ token: refreshToken });
    }
};

export const refreshAccessToken = async (refreshToken) => {
    if (!refreshToken) {
        throw new AppError("No refresh token provided", 401);
    }

    const activeSession = await RefreshToken.findOne({ token: refreshToken });
    if (!activeSession) {
        throw new AppError("Invalid or expired session. Please log in again.", 401);
    }

    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

    try {
        const decoded = jwt.verify(refreshToken, refreshTokenSecret);
        const user = await User.findById(decoded.id);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        const accessToken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        return { accessToken };
    } catch (error) {
        // Automatically cleanup invalid session tokens
        await RefreshToken.deleteOne({ token: refreshToken });
        throw new AppError("Invalid or expired refresh token", 401);
    }
};
