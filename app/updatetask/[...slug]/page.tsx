import { fetchTaskDetailsById } from "@/libs/data";
import Edit_Task_Form from "@/components/forms/edit-task";
import { Column, Tasks } from "@/libs/definitions";

export default async function Edit_Task({
  params,
}: {
  params: { slug: string };
}) {
  let s = await params;
  const slug = s.slug;
  const id = decodeURIComponent(slug[0]);
  const name = slug[1];
  const title = decodeURIComponent(slug[2]);

  const req = await fetchTaskDetailsById(id);
  const response = await req?.json();

  const columnNames = response.columns.map((column: Column) => column.name);

  let data = response.columns.find((column: Column) => column.name === name);
  data = data.tasks.find((task: Tasks) => task.title === title);

  // console.log(data);
  return <Edit_Task_Form options={columnNames} task={data} />;
}
