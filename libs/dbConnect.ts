import mongoose from "mongoose";

export async function dbConnect() {
  try {
    mongoose.connect(process.env.MONGODB_URI!);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB");
    throw new Error("Error connecting to MongoDB");
  }
}
