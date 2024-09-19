"use client";
import { useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TaskCard({ title, id }: { title: string; id: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <section
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-[280px] rounded-lg bg-white py-[23px]"
    >
      <article className="px-4">
        <h1 className="font-bold text-primary-dark text-[15px] mb-2">
          {title}
        </h1>
        <p className="mb-4 text-[13px] text-secondary-gray font-bold"></p>
      </article>
    </section>
  );
}
