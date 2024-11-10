import Image from "next/image";
import Header from "@/components/header";
import NavBar from "@/components/side-bar";
import Container from "@/components/dnd/container";
import { fetchAllTask } from "@/libs/data";
import LoginForm from "@/components/forms/login-form";

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
      <div className="md:flex justify-between">
        <div className="min-h-screen hidden md:inline-block">
          <NavBar boards={res} />
        </div>
        <div className="md:w-full ">
          <Header boards={res} />
          <div className="">
            <Container data={res} />
          </div>
        </div>
      </div>
    </main>
  );
}
