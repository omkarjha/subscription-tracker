import mongoose from "mongoose";
import { MONGODB_URI, NODE_ENV } from "../config/env.js";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env");

}

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
        });
        console.log(`MongoDB Connected: ${NODE_ENV}`);
    } catch (error) {
        console.error('MongoDB Connection Error: ', error);

        process.exit(1);
    }
}

export default connectDB;