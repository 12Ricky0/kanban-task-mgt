import Image from "next/image";
import Header from "@/components/header";
import NavBar from "@/components/side-bar";
import Column from "@/components/dnd/column";
import DeleteModal from "@/components/modals/delete";
import TaskForm from "@/components/modals/task-form";
import Details from "@/components/modals/task-details";
import TaskCard from "@/components/task-card";
import data from "@/data.json";
import { AddColumnButton } from "@/components/buttons/buttons";
import Container from "@/components/dnd/container";
// import BoardForm from "@/components/forms/board";
import { fetchAllTask, fetchTaskDetails } from "@/libs/data";

export default async function Home() {
  // const mainTask = i[0].columns.map((column) => column.tasks);
  // const tas: { [key: string]: string[] } = i[0].columns.reduce(
  //   (acc, column) => {
  //     // Use computed property names to create dynamic keys
  //     acc[column.name] = column.tasks.map((task) => ({
  //       title: task.title,
  //       subtasks: task.subtasks, // assuming subtasks is an array
  //     }));
  //     return acc;
  //   },
  //   {}
  // );

  let data = await fetchAllTask();
  let res = await data?.json();
  // console.log(res);
  return (
    <main className="">
      <Header boards={res} />
      <div className="flex gap-6 pl-6 md:pl-0 overflow-scroll">
        <div className="hidden md:block">
          <NavBar boards={res} />
        </div>
        <Container data={res} />
        <AddColumnButton />
      </div>
      {/* <DeleteModal /> */}
      {/* <Details /> */}
      {/* <TaskForm /> */}
    </main>
  );
}
