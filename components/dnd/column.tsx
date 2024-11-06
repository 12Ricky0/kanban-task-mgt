"use client";
import { useSortable } from "@dnd-kit/sortable";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskCard from "../task-card";
import { CSS } from "@dnd-kit/utilities";
import { DragOverlay, useDroppable } from "@dnd-kit/core";

import { Subtask, Task } from "@/libs/definitions";

export default function Column({
  task,
  index,
  name,
  active,
}: {
  task: Task[];
  index: string;
  name: string;
  active: any;
  // subtask: Subtask[];
}) {
  function color(index: string) {
    switch (index) {
      case "0":
        return "bg-[#49C4E5]";
      case "1":
        return "bg-[#8471F2]";
      case "2":
        return "bg-[#67E2AE]";
      case "3":
        return "bg-red-500";
      case "4":
        return "bg-[#FB7813]";
      case "5":
        return "bg-[#FFF455]";
      default:
        return "bg-red-500";
    }
  }

  // const { attributes, listeners, setNodeRef, transform, transition } =
  //   useSortable({ id: name, data: { type: "container", name } });
  const { setNodeRef } = useDroppable({
    id: name,
  });

  // const style = {
  //   transform: CSS.Transform.toString(transform),
  //   transition: transition,
  // };

  return (
    <article className="min-h-full">
      <div className="inline-flex flex-row items-center gap-3">
        <div className={`size-[15px] rounded-full bg-red ${color(index)}`} />
        <h1 className="my-6 mr-[100px] text-secondary-gray text-[12px] tracking-[2.4px] font-bold leading-normal">
          {name.toLocaleUpperCase()} ({task.length})
        </h1>
      </div>
      <SortableContext id={name} items={task.map((t) => t.title)}>
        <ul
          ref={setNodeRef}
          // style={style}
          // {...attributes}
          // {...listeners}
          className=""
        >
          {task.map((d) => (
            <div key={d.title} className="mb-5">
              <TaskCard
                slug={name}
                subtask={d.subtasks}
                title={d.title}
                id={d.title}
              />
            </div>
          ))}
        </ul>
      </SortableContext>
    </article>
  );
}
