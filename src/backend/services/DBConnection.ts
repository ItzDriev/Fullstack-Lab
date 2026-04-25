import mongoose from "mongoose";
import { dbOptions } from "../config/DBOptions.ts";

export async function connectDB(): Promise<void> {
  try {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(MONGO_URI, dbOptions);
    console.log("Successfully connected to AtlasDB");
  } catch (error) {
    console.error("Connection error:", error);
    process.exit(1);
  }
}
