"use client";
import Link from "next/link";
import { useContext } from "react";
import { KanbanContext } from "@/context";
export function AddColumnButton() {
  const { userboard }: any = useContext(KanbanContext);

  return (
    <button className="bg-secondary-light-blue hover:text-primary-violet dark:bg-[#2b2c37] h-[95vh] mr-5 w-[280px] px-[55px] my-6 text-secondary-gray font-bold text-xl rounded-lg">
      <Link href={`/editboard/${userboard.id}`}> + New Column</Link>
    </button>
  );
}
