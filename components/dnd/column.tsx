"use client";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import TaskCard from "../task-card";
import { Task } from "@/libs/definitions";

export default function Column({ task, name }: { task: Task[]; name: string }) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [items, setItems] = useState(task || []);

  function handleDragEnd(event: DragOverEvent) {
    const { active, over } = event;

    if (active.id !== over!.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.title === active.id);
        const newIndex = items.findIndex((item) => item.title === over!.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
  return (
    <section>
      {/* <div className="flex flex-row items-center gap-3">
        <div className="size-[15px] rounded-full bg-[#49C4E5]" />
        <h1 className="my-6 text-secondary-gray text-[12px] tracking-[2.4px] font-bold leading-normal">
          TODO ({items.length})
        </h1>
      </div> */}
      {/* <Droppable_Column id={name} taskName={name} total={items.length}> */}
      <div className="flex flex-row items-center gap-3">
        <div className="size-[15px] rounded-full bg-[#49C4E5]" />
        <h1 className="my-6 text-secondary-gray text-[12px] tracking-[2.4px] font-bold leading-normal">
          {name.toLocaleUpperCase()} ({items.length})
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
              <TaskCard
                subtask={d.subtasks}
                title={d.title}
                key={d.title}
                id={d.title}
                drop_id={name}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
      {/* </Droppable_Column> */}
    </section>
  );
}
