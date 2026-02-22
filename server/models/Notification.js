import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        type: {
            type: String,
            enum: [
                "APPLICATION_STATUS_UPDATED",
                "NEW_APPLICATION",
                "JOB_ACTIVATED",
                "JOB_DEACTIVATED",
                "SYSTEM",
            ],
            required: true,
        },
        title: {
            type: String,
            required: true,
            maxlength: 150,
        },
        message: {
            type: String,
            required: true,
            maxlength: 500,
        },
        metadata: {
            jobId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Job",
            },
            applicationId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Application",
            },
        },
        isRead: {
            type: Boolean,
            default: false,
            index: true,
        },
        readAt: Date,
    },
    { timestamps: true }
);

export const Notification = mongoose.model("Notification", notificationSchema);