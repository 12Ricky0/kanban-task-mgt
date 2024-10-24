"use server";
import { dbConnect } from "./dbConnect";
import Kanban from "@/models/kanbanData";

export async function fetchPlatformLaunch(name: string) {
  try {
    await dbConnect();
    const res = await Kanban.find({ name: name });
    return Response.json(res);
  } catch (error) {
    console.error(error);
  } finally {
    // mongoose.connection.close();
  }
}

export async function fetchTaskDetails(id: string) {
  try {
    await dbConnect();
    const res = await Kanban.findOne({
      _id: id,
    });

    return Response.json(res);
  } catch (error) {
    console.error(error);
  }
}
