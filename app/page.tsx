import Image from "next/image";
import Header from "@/components/header";
import NavBar from "@/components/side-bar";
import DeleteModal from "@/components/modals/delete";
import TaskForm from "@/components/modals/task-form";
import Details from "@/components/modals/task-details";

export default function Home() {
  return (
    <main className="">
      <Header />
      {/* <NavBar /> */}
      {/* <DeleteModal /> */}
      <Details />
      {/* <TaskForm /> */}
    </main>
  );
}
