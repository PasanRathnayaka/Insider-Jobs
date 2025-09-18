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
    referenceID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true}); 

export const Job = mongoose.model("Job", jobSchema); 