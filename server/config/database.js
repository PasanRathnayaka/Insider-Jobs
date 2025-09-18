import mongoose from "mongoose";

export const connectDB = async () => {

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongoDB connected: ${conn.connection.host}`);

    } catch (error) {
        console.error(`Error connecting in mongoDB: ${error.message}`);
        process.exit(1);
    }

}