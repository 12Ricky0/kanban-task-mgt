import { fetchTaskDetailsById } from "@/libs/data";
import EditBoardForm from "@/components/forms/editboard";
export default async function Edit_Board({
  params,
}: {
  params: { id: string };
}) {
  const id = decodeURIComponent(params.id);
  let req = await fetchTaskDetailsById(id);
  const response = await req?.json();
  return <EditBoardForm id={id} board={response} />;
}
