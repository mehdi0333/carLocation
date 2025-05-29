import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default async function connectDB(serverListener) {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    serverListener();
  } catch (error) {
    console.error("MongoDB connection error:", err);
  }
}
