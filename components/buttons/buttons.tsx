"use client";
import Link from "next/link";
import { useContext } from "react";
import { KanbanContext } from "@/context";
export function AddColumnButton() {
  const { userboard }: any = useContext(KanbanContext);

  return (
    <button className="bg-secondary-light-blue h-[95vh] mr-5 w-[280p px-[55px] my-6 text-secondary-gray font-bold text-xl rounded-lg">
      <Link href={`/editboard/${userboard.id}`}> + New Column</Link>
    </button>
  );
}
