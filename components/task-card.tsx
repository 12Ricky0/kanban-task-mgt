"use client";
import { UniqueIdentifier, useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Subtask, Tasks } from "@/libs/definitions";
import Link from "next/link";
import { useContext } from "react";
import { KanbanContext } from "@/context";

export default function TaskCard({
  title,
  slug,
  id,
  subtask,
}: {
  title: string;
  slug: string;
  id: UniqueIdentifier;
  subtask: Subtask[];
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
  };
  const { userboard }: any = useContext(KanbanContext);

  const completed = subtask.filter((task) => task.isCompleted === true).length;

  return (
    <div>
      <section
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="w-[280px] rounded-lg bg-white py-[23px]"
      >
        <Link href={`/details/${userboard.id}/${slug}/${title}`}>
          <article className="px-4">
            <h1 className="font-bold text-primary-dark text-[15px] mb-2">
              {title}
            </h1>
            <p className="mb-4 text-[13px] text-secondary-gray font-bold">
              {completed} of {subtask.length} subtasks
            </p>
          </article>
        </Link>
      </section>
    </div>
  );
}
