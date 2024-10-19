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
import { Subtask } from "@/libs/definitions";

export default function Container() {
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

  const i = data.boards.filter(
    (board) => board.name === "Platform Launch" && board.columns
  );

  const mainTask: { [key: string]: { title: string; subtasks: Subtask[] }[] } =
    i[0].columns.reduce((acc: any, column) => {
      acc[column.name] = column.tasks.map((task) => ({
        title: task.title,
        subtasks: task.subtasks, // assuming subtasks is an array
      }));
      return acc;
    }, {});

  const [items, setItems] = useState(mainTask || {});
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  // function handleDragEnd(event: DragEndEvent) {
  //   const { active, over } = event;
  //   if (active.id === over?.id) return;

  //   if (
  //     active.data.current!.sortable.containerId !==
  //     over?.data.current!.sortable.containerId
  //   )
  //     return;

  //   if (active.id !== over!.id) {
  //     const containerName = active.data.current?.sortable.containerId;

  //     setItems((taskList) => {
  //       const temp = { ...taskList };
  //       if (!over) return temp;
  //       const oldIdx = temp[containerName].indexOf(active.id.toString());
  //       const newIdx = temp[containerName].indexOf(over.id.toString());
  //       temp[containerName] = arrayMove(temp[containerName], oldIdx, newIdx);
  //       return temp;
  //     });
  //   }
  // }

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
      // onDragEnd={handleDragEnd}
      sensors={sensors}
      // onDragOver={handleDragOver}
      collisionDetection={closestCenter}
      // onDragStart={handleDragStart}
      // onDragMove={handleDragMove}
      // onDragEnd={handleDragEnd}
    >
      {Object.entries(items).map(([column, task]) => (
        <Column
          name={column}
          key={column}
          task={task.map((t) => t)}
          // subtask={task.map((item) => item.subtasks)}
        />
      ))}
    </DndContext>
  );
}
