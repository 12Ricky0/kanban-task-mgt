import { fetchTaskDetailsById } from "@/libs/data";
import EditBoardForm from "@/components/forms/editboard";
export default async function Edit_Board({
  params,
}: {
  params: { id: string };
}) {
  const s = await params;
  const id = decodeURIComponent(s.id);
  let req = await fetchTaskDetailsById(id);
  const response = await req?.json();
  return <EditBoardForm id={id} board={response} />;
}
