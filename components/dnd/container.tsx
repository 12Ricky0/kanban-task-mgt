"use client";

import data from "@/data.json";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverEvent,
  DragEndEvent,
  DragStartEvent,
  DragMoveEvent,
  DragOverlay,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import Column from "./column";
import TaskCard from "../task-card";
import { Subtask, Board } from "@/libs/definitions";

export default function Container({ data }: { data: Board[] }) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const mainTask: { [key: string]: { title: string; subtasks: Subtask[] }[] } =
    data[0].columns.reduce((acc: any, column) => {
      acc[column.name] = column.tasks.map((task) => ({
        title: task.title,
        subtasks: task.subtasks,
      }));
      return acc;
    }, {});

  const [items, setItems] = useState(mainTask || {});
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  function handleDragEnd(event: DragOverEvent) {
    const { active, over } = event;
    console.log(items);
    const containerName = active.data.current?.sortable?.containerId;

    if (active.id !== over!.id) {
      setItems((items) => {
        const temp = { ...items };
        const oldIndex = temp[containerName].findIndex(
          (item) => item.title === active.id
        );
        const newIndex = temp[containerName].findIndex(
          (item) => item.title === over!.id
        );
        arrayMove(temp[containerName], oldIndex, newIndex);
        return temp;
      });
    }
  }
  // const handleDragOver = (e: DragOverEvent) => {
  //   const { active, over } = e;
  //   if (!over) return;

  //   const initialContainer = active.data.current?.sortable?.containerId;
  //   const targetContainer = over.data.current?.sortable?.containerId;
  //   if (!initialContainer) return;

  //   setItems((taskList) => {
  //     const temp = { ...taskList };

  //     if (!targetContainer) {
  //       if (taskList[over!.id].includes(active.id.toString())) return temp;

  //       temp[initialContainer] = temp[initialContainer].filter(
  //         (task) => task !== active.id.toString()
  //       );

  //       temp[over!.id].push(active.id.toString());

  //       return temp;
  //     }

  //     if (initialContainer === targetContainer) {
  //       const oldIdx = temp[initialContainer].indexOf(active.id.toString());
  //       const newIdx = temp[initialContainer].indexOf(over!.id.toString());
  //       temp[initialContainer] = arrayMove(
  //         temp[initialContainer],
  //         oldIdx,
  //         newIdx
  //       );
  //     } else {
  //       temp[initialContainer] = temp[initialContainer].filter(
  //         (task) => task !== active.id.toString()
  //       );

  //       const newIdx = temp[targetContainer].indexOf(over!.id.toString());
  //       const oldIdx = temp[initialContainer].indexOf(active.id.toString());
  //       const [removeditem] = temp[initialContainer].splice(oldIdx, 1);

  //       temp[targetContainer].splice(newIdx, 0, removeditem);
  //     }

  //     return temp;
  //   });
  // };

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      sensors={sensors}
      // onDragOver={handleDragOver}
      collisionDetection={closestCenter}
      // onDragStart={handleDragStart}
      // onDragMove={handleDragMove}
      // onDragEnd={handleDragEnd}
    >
      {Object.entries(items).map(([column, task]) => (
        <Column name={column} key={column} task={task && task.map((t) => t)} />
      ))}
    </DndContext>
  );
}
