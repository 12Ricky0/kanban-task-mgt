import Details from "@/components/modals/task-details";
import { fetchTaskDetailsById } from "@/libs/data";
import { Column, Tasks } from "@/libs/definitions";

export default async function TaskDetails({
  params,
}: {
  params: { id: string; slug: string; title: string };
}) {
  let s = await params;

  let res = await fetchTaskDetailsById(s.id);
  const response = await res?.json();
  let data_one = response.columns.find(
    (column: Column) => column.name === decodeURIComponent(s.slug)
  );
  let data_two = data_one.tasks.find(
    (task: Tasks) => task.title === decodeURIComponent(s.title)
  );
  const columnNames = response.columns.map((column: Column) => column.name);

  return (
    <Details
      options={columnNames}
      data={data_two}
      id={s.id}
      name={data_one.name}
      column_id={data_one._id}
    />
  );
}
