"use server";
import { dbConnect } from "./dbConnect";
import KanbanSchema from "@/models/kanbanData";
import mongoose from "mongoose";

export async function fetchPlatformLaunch(name: string) {
  try {
    await dbConnect();
    const res = await KanbanSchema.find({ name: name });
    return Response.json(res);
  } catch (error) {
    console.error(error);
  } finally {
    // mongoose.connection.close();
  }
}
