"use client";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useState } from "react";

export default function Droppable_Column({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items] = useState([1, 2, 3]);
  return (
    <DndContext>
      <SortableContext items={items}>
        <section className="ml-4 md:ml-0">
          <div className="flex flex-row items-center gap-3">
            <div className="size-[15px] rounded-full bg-[#49C4E5]" />
            <h1 className="my-6 text-secondary-gray text-[12px]">TODO</h1>
          </div>
          <div className="inline-flex flex-col gap-[20px]">{children}</div>
        </section>
      </SortableContext>
    </DndContext>
  );
}
