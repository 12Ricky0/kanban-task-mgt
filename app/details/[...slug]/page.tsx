import Details from "@/components/modals/task-details";
import { fetchTaskDetails } from "@/libs/data";
import { Column, Tasks } from "@/libs/definitions";

export default async function TaskDetails({
  params,
}: {
  params: { slug: string };
}) {
  const slug = await params?.slug;
  const id = decodeURIComponent(slug[0]);
  const name = slug[1];
  const title = decodeURIComponent(slug[2]);

  let res = await fetchTaskDetails(id);
  const response = await res?.json();
  let data = response.columns.find((column: Column) => column.name === name);
  data = data.tasks.find((task: Tasks) => task.title === title);

  return <Details data={data} />;
}
