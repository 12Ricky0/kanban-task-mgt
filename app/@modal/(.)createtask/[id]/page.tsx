import TaskForm from "@/components/forms/task-form";
import { fetchTaskDetailsById } from "@/libs/data";
import { Column } from "@/libs/definitions";

export default async function createTask({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const s = await params;
  const req = await fetchTaskDetailsById(s.id);
  const data = await req?.json();

  const columnNames = data.columns.map((column: Column) => column.name);
  return <TaskForm options={columnNames} />;
}
