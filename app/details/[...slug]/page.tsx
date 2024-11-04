import Details from "@/components/modals/task-details";
import { fetchTaskDetailsById } from "@/libs/data";
import { Column, Tasks } from "@/libs/definitions";

export default async function TaskDetails({
  params,
}: {
  params: { slug: string };
}) {
  let s = await params;
  const slug = s.slug;
  const id = decodeURIComponent(slug[0]);
  const name = slug[1];
  const title = decodeURIComponent(slug[2]);

  let res = await fetchTaskDetailsById(id);
  const response = await res?.json();
  let data_one = response.columns.find(
    (column: Column) => column.name === name
  );
  let data_two = data_one.tasks.find((task: Tasks) => task.title === title);
  const columnNames = response.columns.map((column: Column) => column.name);

  // console.log(data_two);
  return (
    <Details
      options={columnNames}
      data={data_two}
      id={id}
      name={data_one.name}
      column_id={data_one._id}
    />
  );
}
