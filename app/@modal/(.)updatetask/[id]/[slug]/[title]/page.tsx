import { fetchTaskDetailsById } from "@/libs/data";
import Edit_Task_Form from "@/components/forms/edit-task";
import { Column, Tasks } from "@/libs/definitions";

export default async function Edit_Task({
  params,
}: {
  params: Promise<{ id: string; slug: string; title: string }>;
}) {
  let query = await params;

  const req = await fetchTaskDetailsById(query.id);
  const response = await req?.json();

  const columnNames = response.columns.map((column: Column) => column.name);

  let res = response.columns.find(
    (column: Column) => column.name === query.slug
  );
  let data = res.tasks.find(
    (task: Tasks) => task.title === decodeURIComponent(query.title)
  );

  return (
    <Edit_Task_Form
      options={columnNames}
      column_id={res._id}
      task={data}
      id={response._id}
    />
  );
}
