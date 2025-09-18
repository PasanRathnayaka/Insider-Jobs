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
        required: true
    },
    diliveredTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true})

export const Application = mongoose.model("Application", applicationSchema);