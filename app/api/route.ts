import { dbConnect } from "@/libs/dbConnect";
import KanbanSchema from "@/models/kanbanData";

export async function POST(request: Request) {
  const res = await request.json();
  await dbConnect();
  //   await KanbanSchema.create(res);
  console.log(res);

  return Response.json(
    { message: "Data Inserted Sucessfully" },
    { status: 200 }
  );
}
