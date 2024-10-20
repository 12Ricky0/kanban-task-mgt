"use client";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskCard from "../task-card";
import { Subtask, Task } from "@/libs/definitions";

export default function Column({
  task,
  name,
}: {
  task: Task[];
  name: string;
  // subtask: Subtask[];
}) {
  function color(name: string) {
    switch (name) {
      case "Todo":
        return "bg-[#49C4E5]";
      case "Doing":
        return "bg-[#8471F2]";
      case "Done":
        return "bg-[#67E2AE]";

      default:
        return "bg-red";
    }
  }
  const { setNodeRef } = useDroppable({ id: name });
  return (
    <article className="min-h-full">
      <div className="inline-flex flex-row items-center gap-3">
        <div className={`size-[15px] rounded-full ${color(name)}`} />
        <h1 className="my-6 text-secondary-gray text-[12px] tracking-[2.4px] font-bold leading-normal">
          {name.toLocaleUpperCase()} ({task.length})
        </h1>
      </div>
      <SortableContext
        id={name}
        items={Object.values(task).map((k) => k.title)}
      >
        <ul ref={setNodeRef} className="">
          {task.map((d) => (
            <div key={d.title} className="mb-5">
              <TaskCard subtask={d.subtasks} title={d.title} id={d.title} />
            </div>
          ))}
        </ul>
      </SortableContext>
    </article>
  );
}
