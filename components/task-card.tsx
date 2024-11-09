"use client";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Subtask } from "@/libs/definitions";
import Link from "next/link";
import { useContext, useState } from "react";
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
  subtask?: Subtask[];
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
  };
  const { userboard }: any = useContext(KanbanContext);

  const completed = subtask!.filter((task) => task.isCompleted === true).length;

  return (
    <div>
      <Link href={`/details/${userboard.id}/${slug}/${title}`} passHref>
        <section
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          className="w-[280px] group rounded-lg bg-white dark:bg-secondary-dark-gray py-[23px]"
        >
          <article className="px-4">
            <h1 className="font-bold group-hover:text-primary-violet text-primary-dark dark:text-white text-[15px] mb-2">
              {title}
            </h1>

            <p className="mb-4 text-[13px] text-secondary-gray font-bold">
              {completed} of {subtask!.length} subtasks
            </p>
          </article>
        </section>
      </Link>
    </div>
  );
}

export function Item({ id }: { id: UniqueIdentifier }) {
  const style = {
    width: "280px",
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    margin: "10px 0",
    borderRadius: 5,
  };

  return (
    <div
      className="bg-white dark:bg-secondary-dark-gray text-primary-dark dark:text-white"
      style={style}
    >
      {id}
    </div>
  );
}
