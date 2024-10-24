"use client";
import { UniqueIdentifier, useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Subtask, Tasks } from "@/libs/definitions";
import Link from "next/link";

export default function TaskCard({
  title,
  dataID,
  slug,
  id,
  subtask,
}: {
  title: string;
  slug: string;
  dataID: string;
  id: UniqueIdentifier;
  subtask: Subtask[];
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
  };
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
        <Link href={`/details/${dataID}/${slug}/${title}`}>
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
