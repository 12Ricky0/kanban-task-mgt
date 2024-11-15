"use server";
import { dbConnect } from "./dbConnect";
import Kanban from "@/models/kanbanData";
import { auth } from "@/auth";
import { getUser } from "./actions";
import { createBoard } from "./actions";

export async function fetchAllTask() {
  try {
    await dbConnect();
    const session = await auth();

    const data = {
      boards: [{ user: session?.user?.email, name: "Welcome", columns: [] }],
    };

    const res = await Kanban.find({ user: session?.user?.email });
    // const response = Response.json(res);
    // if (!response) {
    //   await Kanban.create(data);
    //   const d = await Kanban.findOne({ user: session?.user?.email });
    //   return Response.json(d);
    // }
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
