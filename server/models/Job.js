import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        enum: [true, false],
        default: true
    },
    skills: {
        type: [String],
        required: true,
        validate: {
            validator: (v) => v.length > 0,
            message: "At least one skill is required",
        },
    },

    responsibilities: {
        type: [String],
        required: true,
        validate: {
            validator: (v) => v.length > 0,
            message: "At least one responsibility is required",
        },
    },
    referenceID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

export const Job = mongoose.model("Job", jobSchema); 