"use client";
import Link from "next/link";
import { useContext } from "react";
import { KanbanContext } from "@/context";

export default function Empty() {
  const { userboard, displaySidebar }: any = useContext(KanbanContext);

  return (
    <div
      className={`flex flex-col justify-center md:mt-[100px] ${
        displaySidebar ? "md:pl-[280px]" : "md:pl-0"
      }  mx-6 md:mx-0 items-center h-screen`}
    >
      <>
        <p className="text-secondary-gray mb-8 font-bold text-[18px] text-center">
          This board is empty. Create a new column to get started.
        </p>

        <Link
          className="text-white text-[15px]  rounded-3xl font-semibold bg-primary-violet cursor-pointer hover:bg-primary-light-violet h-auto w-auto py-[15px] px-6"
          href={`/editboard/${userboard.id}`}
        >
          + Add New Column
        </Link>
      </>
    </div>
  );
}
