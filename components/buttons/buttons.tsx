"use client";
import Link from "next/link";
import { useContext } from "react";
import { KanbanContext } from "@/context";
export function AddColumnButton() {
  const { userboard }: any = useContext(KanbanContext);

  return (
    <Link
      href={`/editboard/${userboard.id}`}
      className="bg-secondary-light-blue hover:text-primary-violet dark:bg-[#2b2c37] h-[95vh] mr-5 w-[280px] px-[55px] flex items-center my-6 text-secondary-gray font-bold text-xl rounded-lg"
    >
      + New Column
    </Link>
  );
}
