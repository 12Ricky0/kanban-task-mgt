"use client";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import TaskCard from "../task-card";
import data from "../../data.json";

export default function Droppable_Column() {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const todo = data.boards.find((board) =>
    board.columns.find((column) =>
      column.tasks.find((task) => task.status == "Todo")
    )
  );

  const i = todo?.columns.find((column) =>
    column.tasks.find((task) => task.status == "Todo")
  );

  const [items, setItems] = useState(i?.tasks || []);

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.title === active.id);
        const newIndex = items.findIndex((item) => item.title === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
  return (
    <section className="ml-4 md:ml-0">
      <div className="flex flex-row items-center gap-3">
        <div className="size-[15px] rounded-full bg-[#49C4E5]" />
        <h1 className="my-6 text-secondary-gray text-[12px] tracking-[2.4px] font-bold leading-normal">
          TODO
        </h1>
      </div>
      <div className="inline-flex flex-col gap-[20px]">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items.map((t) => t.title)}
            strategy={verticalListSortingStrategy}
          >
            {items?.map((d) => (
              <TaskCard title={d.title} key={d.title} id={d.title} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </section>
  );
}
