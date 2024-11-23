"use server";
import { dbConnect } from "./dbConnect";
import Kanban from "@/models/kanbanData";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

export async function fetchAllTask() {
  try {
    await dbConnect();
    const session = await auth();
    const res = await Kanban.find({ user: session?.user?.email });
    return Response.json(res);
  } catch (error) {
    console.error(error);
    throw new Error(notFound());
  } finally {
  }
}

export async function fetchTaskDetailsById(id: string) {
  try {
    await dbConnect();

    const res = await Kanban.findOne({
      _id: id,
    });

    return Response.json(res);
  } catch (error) {
    console.error(error);
    throw new Error(notFound());
  }
}
