"use client";
import { Overlay } from "../overlay";
import { useState, useActionState, useRef } from "react";
import SubtaskForm from "./subtask";
import Image from "next/image";
import { BoardColumns } from "./subtask";
import { updateBoard } from "@/libs/actions";
import { Board } from "@/libs/definitions";

export default function EditBoardForm({
  board,
  id,
}: {
  board: Board;
  id: string;
}) {
  const [columns, setColumns] = useState(board.columns);

  function handleDelete(key: number) {
    setColumns((prev) => {
      return prev.filter((_, i) => i !== key);
    });
  }
  const inputRef = useRef<HTMLInputElement>(null);

  function handleAdd(event: React.FormEvent) {
    event.preventDefault();
    const columnName = inputRef.current?.value;
    setColumns((prev) => [...prev, { name: columnName!, tasks: [] }]);
  }
  const payload = updateBoard.bind(null, id);
  const [state, formAction] = useActionState(payload, null);
  console.log(board);
  return (
    <Overlay>
      <section className="bg-white mx-4 w-full md:w-[480px] rounded-lg z-10">
        <h1 className="mx-6 font-bold text-[18px] text-primary-dark py-6">
          Edit Board
        </h1>

        <form action={formAction} className="mx-6">
          <div className="flex flex-col">
            <label
              className="mb-2 text-[13px] text-secondary-gray font-bold"
              htmlFor="title"
            >
              Name
            </label>
            <input
              type="text"
              id="title"
              name="board-title"
              defaultValue={board.name}
              placeholder="e.g. Web Design"
              className="w-full border border-secondary-gray border-opacity-25 rounded-lg font-medium text-[13px] pl-4 py-2"
            />
            {/* {state?.errors.name && (
              <div className="">
                <p className="text-[13px] md:text-[14px] text-tetiary-red">
                  {state.errors.name}
                </p>
              </div>
            )} */}
          </div>

          <div className="mt-6">
            <h1 className="mb-2 text-[13px] text-secondary-gray font-bold">
              Columns
            </h1>
            {columns.map((column, index) => (
              <div key={index}>
                <BoardColumns
                  name={column.name}
                  key={index}
                  onDelete={() => handleDelete(index)}
                />
                <input
                  type="hidden"
                  readOnly
                  name={column.name}
                  value={JSON.stringify(column.tasks)}
                />
              </div>
            ))}

            <button
              className=" text-primary-violet hover:bg-secondary-light-blue h-10 font-bold text-[13px] bg-tetiary-white-space w-[100%] mb-6 rounded-full"
              onClick={handleAdd}
            >
              +Add New Column
            </button>
          </div>
          <button className="block mb-4 text-white hover:bg-primary-light-violet h-10 font-bold text-[13px] bg-primary-violet w-[100%] rounded-full">
            Create New Board
          </button>
        </form>
      </section>
    </Overlay>
  );
}
