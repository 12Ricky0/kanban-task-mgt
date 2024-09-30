import Image from "next/image";
import Header from "@/components/header";
import NavBar from "@/components/side-bar";
import Droppable_Column from "@/components/dnd/column";
import DeleteModal from "@/components/modals/delete";
import TaskForm from "@/components/modals/task-form";
import Details from "@/components/modals/task-details";
import TaskCard from "@/components/task-card";
import data from "@/data.json";
import { AddColumnButton } from "@/components/buttons/buttons";
// import BoardForm from "@/components/forms/board";

export default function Home() {
  const todo = data.boards.find((board) =>
    board.columns.find((column) =>
      column.tasks.find((task) => task.status == "Todo")
    )
  );

  // const i = todo?.columns.find((column) =>
  //   column.tasks.find((task) => task.status == "Todo")
  // );

  // console.log(i);

  return (
    <main className="">
      <Header />
      <div className="flex gap-6 overflow-scroll">
        <div className="hidden md:block">
          <NavBar />
        </div>
        <div>
          <Droppable_Column />
        </div>
        <div>
          <Droppable_Column />
        </div>
        <AddColumnButton />
      </div>
      {/* <DeleteModal /> */}
      {/* <Details /> */}
      {/* <BoardForm /> */}
    </main>
  );
}
