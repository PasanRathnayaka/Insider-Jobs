import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "";

export const connectDB = async () => {
    try {

        const options = {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        };

        const conn = await mongoose.connect(MONGO_URI, options);
        console.log(`mongoDB connected: ${conn.connection.host}`);

    } catch (error) {
        console.error(`Error connecting in mongoDB: ${error.message}`);
        process.exit(1);
    }
};

mongoose.connection.on("error", (error) => {
    console.log("MongoDB connection error after initial connection: ", error);
});

mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected");
});

mongoose.connection.on("close", () => {
    console.log("MongoDB connection closed");
});