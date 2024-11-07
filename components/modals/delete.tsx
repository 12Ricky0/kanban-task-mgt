"use client";
import { Overlay } from "../overlay";
import { useContext } from "react";
import { KanbanContext } from "@/context";
import { deleteBoard, deleteTask } from "@/libs/actions";
import { usePathname } from "next/navigation";

export default function DeleteModal({
  title,
  type,
  id,
  column_id,
}: {
  title: string;
  type: string;
  id?: string;
  column_id?: string;
}) {
  const { setShowDelete, setShowActionButtons }: any =
    useContext(KanbanContext);

  const pathname = usePathname();
  return (
    <div className="flex absolute">
      <section className="bg-white dark:bg-secondary-dark-gray z-10 mx-4 md:w-[480px] rounded-lg pb-6">
        <article className="mx-6 md:mx-8">
          <h1 className="text-[18px] my-6 font-bold text-tetiary-red">
            Delete this {type}?
          </h1>
          <p className="text-[13px] font-medium text-secondary-gray mb-6">
            Are you sure you want to delete the ‘{title}’ task and its subtasks?
            {type == "Task"
              ? " This action cannot be reversed. "
              : " This action will remove all columns and tasks and cannot be reversed."}
          </p>

          <div className="md:flex gap-4">
            <button
              onClick={() => {
                if (pathname == "/") {
                  deleteBoard(id!);
                  setShowDelete(false);
                  setShowActionButtons(false);
                } else {
                  // console.log(pathname);
                  deleteTask(id!, column_id!, title);
                }
                return;
                // console.log(pathname == "/");
              }}
              className="block mb-4 text-white hover:bg-tetiary-light-red leading-[23p] h-10 font-bold text-[13px] bg-tetiary-red w-[100%] rounded-full"
            >
              Delete
            </button>
            <button
              onClick={() => {
                setShowDelete(false);
                setShowActionButtons(false);
              }}
              className=" text-primary-violet hover:bg-secondary-light-blue leading-[23p] h-10 font-bold text-[13px] bg-tetiary-white-space w-[100%] rounded-full"
            >
              Cancel
            </button>
          </div>
        </article>
      </section>
    </div>
  );
}
