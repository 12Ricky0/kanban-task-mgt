"use client";
import { ReactNode } from "react";
import { KanbanContext } from "@/context";
import { useContext } from "react";
import { useRouter } from "next/navigation";

export function Overlay({ children }: { children: ReactNode }) {
  const { setDisplayTaskForm }: any = useContext(KanbanContext);
  const router = useRouter();
  function handleClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      setDisplayTaskForm(false);
      router.back();
    }
  }
  return (
    <div
      onClick={handleClick}
      className="overlay flex items-center justify-center"
    >
      {children}
    </div>
  );
}
