"use server";
import { dbConnect } from "./dbConnect";
import Kanban from "@/models/kanbanData";

export async function fetchAllTask() {
  try {
    await dbConnect();
    const res = await Kanban.find();
    return Response.json(res);
  } catch (error) {
    console.error(error);
  } finally {
    // mongoose.connection.close();
  }
}

// export async function fetchTaskDetails(id: string) {
//   try {
//     await dbConnect();
//     const res = await Kanban.findOne({
//       name: id,
//     });

//     return Response.json(res);
//   } catch (error) {
//     console.error(error);
//   }
// }
export async function fetchTaskDetailsById(id: string) {
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
