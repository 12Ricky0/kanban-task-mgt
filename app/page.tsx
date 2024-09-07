import Image from "next/image";
import Header from "@/components/header";
import NavBar from "@/components/side-bar";
import DeleteModal from "@/components/modals/delete";
import TaskForm from "@/components/modals/task-form";

export default function Home() {
  return (
    <main className="">
      <Header />
      {/* <NavBar /> */}
      {/* <DeleteModal /> */}
      <TaskForm />
    </main>
  );
}
