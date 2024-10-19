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

export default function Home() {
  // const i = data.boards.filter(
  //   (board) => board.name === "Platform Launch" && board.columns
  // );

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

  return (
    <main className="">
      <Header />
      <div className="flex gap-6 overflow-scroll">
        <div className="hidden md:block">
          <NavBar />
        </div>
        <Container />
        {/* {data.boards.map(
          (column) =>
            column.name === "Platform Launch" && (
              <section className="flex gap-6 mb-6" key={column.name}>
                {column.columns.map((task) => (
                  <div key={task.name}>
                    <Column name={task.name} task={task.tasks} />
                  </div>
                ))}
              </section>
            )
        )} */}

        <AddColumnButton />
      </div>
      {/* <DeleteModal /> */}
      {/* <Details /> */}
      {/* <BoardForm /> */}
    </main>
  );
}
