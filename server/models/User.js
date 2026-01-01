import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["jobseeker", "recruiter"],
        default: "jobseeker"
    },
    imageURL: {
        type: String,
        default: "default_profile_img.png"
    },
    businessRegistrationNumber: {
        type: String,
        default: null,
        unique: true,
    },
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);