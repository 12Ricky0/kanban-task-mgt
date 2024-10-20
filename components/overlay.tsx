"use client";
import { ReactNode } from "react";
import { KanbanContext } from "@/context";
import { useContext } from "react";

export function Overlay({ children }: { children: ReactNode }) {
  const { setDisplayTaskForm }: any = useContext(KanbanContext);

  return (
    <div
      onClick={() => setDisplayTaskForm(false)}
      className="overlay flex items-center justify-center"
    >
      {children}
    </div>
  );
}
