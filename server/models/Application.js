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
    },
    diliveredTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "accept", "reject"],
        default: "pending",
    },
}, { timestamps: true })

applicationSchema.index({ appliedJob: 1 });
applicationSchema.index({ appliedBy: 1 });
applicationSchema.index({ diliveredTo: 1 });
applicationSchema.index({ status: 1 });

export const Application = mongoose.model("Application", applicationSchema);