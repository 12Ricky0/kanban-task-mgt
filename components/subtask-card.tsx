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
  // const [showDelete, setShowDelete] = useState(false);
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
        className={`${className} absolute bg-white w-[192px] right-5 md:right-0 rounded-lg shadow-lg justify-end mt-5 py-4`}
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
          className={`flex gap-4 bg-secondary-light-blue px-3 pt-[13px] pb-4 text-[12px] font-bold ${
            checkedStates[index] ? "text-secondary-gray" : "text-primary-dark"
          } rounded-lg`}
        >
          <input
            checked={checkedStates[index]}
            onChange={() =>
              handleCheckboxChange(index, subtask._id!, checkedStates[index])
            }
            type="checkbox"
            className="cursor-pointer"
          />
          <label className={`${checkedStates[index] && "line-through"}`}>
            {" "}
            {subtask.title}
          </label>
        </section>
      ))}
    </div>
  );
}
