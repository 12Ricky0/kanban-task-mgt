"use client";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverEvent,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  UniqueIdentifier,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useState, useContext, useEffect } from "react";
import { KanbanContext } from "@/context";
import Column from "./column";
import { Subtask, Board } from "@/libs/definitions";
import { Item } from "../task-card";

export default function Container({ data }: { data: Board[] }) {
  const { userboard }: any = useContext(KanbanContext);
  const [items, setItems] = useState<{
    [key: string]: { title: string; subtasks: Subtask[] }[];
  }>({});

  useEffect(() => {
    const filteredResults = data.filter((d) => d.name === userboard.name);
    const mainTask: {
      [key: string]: { title: string; subtasks: Subtask[] }[];
    } =
      filteredResults.length > 0
        ? filteredResults[0].columns.reduce((acc: any, column) => {
            acc[column.name] = column.tasks.map((task) => ({
              title: task.title,
              subtasks: task.subtasks,
            }));
            return acc;
          }, {})
        : {};

    setItems(mainTask);
  }, [userboard, data]);

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

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    const draggingRec = active.rect.current.translated;

    // Find the containers
    const activeContainer = active.data.current?.sortable?.containerId;
    const overContainer = over?.data.current?.sortable?.containerId || over?.id;

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setItems((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      // Find the indexes for the items

      const activeIndex = activeItems.findIndex(
        (item) => item.title === active.id
      );
      const overIndex = overItems.findIndex((item) => item.title === over?.id);

      let newIndex;
      if (over?.id in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1 &&
          draggingRec!.top > over.rect.top + over.rect.height;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item.title !== active.id),
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    const activeContainer = active.data.current?.sortable?.containerId;
    const overContainer = over?.data.current?.sortable?.containerId;

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = items[activeContainer].findIndex(
      (item) => item.title === active.id
    );
    const overIndex = items[overContainer].findIndex(
      (item) => item.title === over?.id
    );

    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(
          items[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }

    setActiveId(null);
  }
  return (
    <DndContext
      sensors={sensors}
      onDragOver={handleDragOver}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      {Object.entries(items).map(([column, task]) => (
        <Column
          index={Object.keys(items).indexOf(column).toString()}
          name={column}
          key={column}
          // active={activeId}
          task={task && task.map((t) => t)}
        />
      ))}
      <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
    </DndContext>
  );
}
