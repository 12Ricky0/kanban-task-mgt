import Image from "next/image";
import Header from "@/components/header";
import NavBar from "@/components/side-bar";
import Droppable_Column from "@/components/dnd/column";
import DeleteModal from "@/components/modals/delete";
import TaskForm from "@/components/modals/task-form";
import Details from "@/components/modals/task-details";
import TaskCard from "@/components/task-card";

export default function Home() {
  return (
    <main className="">
      <Header />
      <div className="md:flex items-start gap-6">
        <div className="hidden md:block">
          <NavBar />
        </div>
        <div>
          <Droppable_Column>
            <TaskCard title="Build UI for onboarding flow 1" />
          </Droppable_Column>
          <Droppable_Column>
            <TaskCard title="Build UI for onboarding flow 2" />
          </Droppable_Column>
          <Droppable_Column>
            <TaskCard title="Build UI for onboarding flow 3" />
          </Droppable_Column>
        </div>
      </div>
      {/* <DeleteModal /> */}
      {/* <Details /> */}
      {/* <TaskForm /> */}
    </main>
  );
}
