"use client";
import { useDraggable } from "@dnd-kit/core";

export default function TaskCard({ title }: { title: string }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable",
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;
  return (
    <section
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="w-[280px] rounded-lg bg-white py-[23px]"
    >
      <article className="px-4">
        <h1 className="font-bold text-primary-dark text-[20px] mb-2">
          {title}
        </h1>
        <p className="mb-4 text-[13px] text-secondary-gray font-bold"></p>
      </article>
    </section>
  );
}
