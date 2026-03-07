import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log("MongoDB already connected");
    return;
  }

  if (!MONGO_URI) {
    console.error(`MONGO_URI not loaded.`);
  }

  try {
    const options = {
      maxPoolSize: 20,
      minPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    const conn = await mongoose.connect(MONGO_URI, options);

    isConnected = conn.connections[0].readyState === 1;

    console.log(`mongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting in mongoDB: ${error.message}`);
    throw error;
  }
};

mongoose.connection.on("error", (error) => {
  console.log("MongoDB connection error after initial connection: ", error.message);
});

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected");
});

mongoose.connection.on("reconnected", () => {
  console.log("MongoDB reconnected");
});

mongoose.connection.on("close", () => {
  console.log("MongoDB connection closed");
});

process.on("SIGINT", async () => {
  console.log("Shutting down server");

  await mongoose.connection.close();

  console.log("MongoDB connection closed");

  process.exit(0);
});
