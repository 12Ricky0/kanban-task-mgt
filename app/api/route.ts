import { dbConnect } from "@/libs/dbConnect";
import Kanban from "@/models/kanbanData";

export async function POST(request: Request) {
  const res = await request.json();
  await dbConnect();
  await Kanban.create(res.boards);
  //   console.log(res);

  return Response.json(
    { message: "Data Inserted Sucessfully" },
    { status: 200 }
  );
}

export async function GET(request: Request) {
  await dbConnect();
  const res = await Kanban.find();
  return Response.json(res);
}
