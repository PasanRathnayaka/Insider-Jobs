import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({

    appliedJob: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },
    appliedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    diliveredTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    status: {
        type: String,
        enum: ["pending", "accept", "reject"],
        default: "pending",
    },
}, { timestamps: true })

export const Application = mongoose.model("Application", applicationSchema);