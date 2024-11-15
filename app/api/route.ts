import { dbConnect } from "@/libs/dbConnect";
import Kanban from "@/models/kanbanData";
import { auth } from "@/auth";

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
  const session = await auth();

  const res = await Kanban.find({ user: session?.user?.email });
  return Response.json(res);
}
