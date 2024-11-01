import TaskForm from "@/components/modals/task-form";
import { fetchTaskDetailsById } from "@/libs/data";
import { Column } from "@/libs/definitions";

export default async function createTask({
  params,
}: {
  params: { id: string };
}) {
  const req = await fetchTaskDetailsById(params.id);
  const data = await req?.json();

  const columnNames = data.columns.map((column: Column) => column.name);
  // console.log(columnNames);
  return <TaskForm options={columnNames} />;
}
