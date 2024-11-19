"use client";
import { Subtask } from "@/libs/definitions";
import { useState, useContext } from "react";
import DeleteModal from "./modals/delete";
import { Overlay } from "./overlay";
import { KanbanContext } from "@/context";
import Link from "next/link";
import { updatedIsCompleted } from "@/libs/actions";
export default function Popup({
  className,
  type,
  id,
}: {
  className?: string;
  type: string;
  id: string;
}) {
  const {
    showDelete,
    setShowDelete,
    userboard,
    setShowActionButtons,
    showActionButtons,
  }: any = useContext(KanbanContext);

  return (
    <>
      <section
        className={`${className} absolute bg-white dark:bg-primary-semi-dark w-[192px] right-5 md:right-0 rounded-lg shadow-lg justify-end mt-5 py-4`}
      >
        <button className="block ml-4 mb-4 text-[13px] font-medium text-secondary-gray">
          <Link href={`/editboard/${userboard.id}`}>Edit Board</Link>
        </button>
        <button
          onClick={() => {
            setShowDelete(!showDelete);
          }}
          className="ml-4 text-[13px] font-medium text-tetiary-red"
        >
          Delete Board
        </button>
      </section>
      {showDelete && (
        <Overlay>
          <DeleteModal id={id} title={type} type={type} />
        </Overlay>
      )}
    </>
  );
}

export function Subtask_List({
  subtasks,
  id,
  column_id,
  task_id,
}: {
  subtasks: Subtask[];
  id: string;
  column_id: string;
  task_id: string;
}) {
  const [isChecked, setIsChecked] = useState(false);

  const [checkedStates, setCheckedStates] = useState(
    subtasks.map((subtask) => subtask.isCompleted)
  );

  const handleCheckboxChange = (
    index: number,
    title: string,
    status: boolean
  ) => {
    // Toggle the checked state for the specific subtask at index
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = !newCheckedStates[index];
    setCheckedStates(newCheckedStates);
    updatedIsCompleted(id, column_id, task_id, title, status);
  };

  return (
    <div className="flex gap-2 flex-col">
      {subtasks.map((subtask, index) => (
        <section
          key={subtask.title}
          className={`flex gap-4 bg-secondary-light-blue dark:bg-primary-semi-dark px-3 pt-[13px] pb-4 text-[12px] font-bold ${
            checkedStates[index]
              ? "text-secondary-gray"
              : "text-primary-dark dark:text-white"
          } rounded-lg`}
        >
          <>
            <input
              checked={checkedStates[index]}
              onChange={() =>
                handleCheckboxChange(index, subtask._id!, checkedStates[index])
              }
              type="checkbox"
              className="relative peer cursor-pointer dark:bg-secondary-dark-gray appearance-none w-4 h-4 border-1 border-secondary-light-gray rounded-sm bg-white checked:bg-primary-violet checked:border-0"
            />
            <label className={`${checkedStates[index] && "line-through"}`}>
              {" "}
              {subtask.title}
            </label>
            <svg
              className="ml-[2px]
      absolute 
      w-3 h-4 
      hidden peer-checked:block  pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </>
        </section>
      ))}
    </div>
  );
}
