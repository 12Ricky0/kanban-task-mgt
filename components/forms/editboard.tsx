"use client";
import { Overlay } from "../overlay";
import { useState, useActionState, useRef } from "react";
import { BoardColumns } from "./subtask";
import { updateBoard } from "@/libs/actions";
import { Board } from "@/libs/definitions";
import { useRouter } from "next/navigation";

export default function EditBoardForm({
  board,
  id,
}: {
  board: Board;
  id: string;
}) {
  // const [columns, setColumns] = useState(board.columns);

  const [columns, setColumns] = useState<JSX.Element[]>(
    board.columns.map((column) => (
      <div key={column._id}>
        <BoardColumns
          name={column.name}
          key={column._id}
          onDelete={() =>
            setColumns((prev) =>
              prev.filter((subtask) => subtask.key !== column._id)
            )
          }
        />
        <input
          type="hidden"
          readOnly
          name={column.name}
          value={JSON.stringify(column.tasks)}
        />
      </div>
    ))
  );

  function handleDelete(key: number | string) {
    setColumns((prev) => {
      return prev.filter((col) => col.key !== key);
    });
  }
  const inputRef = useRef<HTMLInputElement>(null);

  // function handleAdd(event: React.FormEvent) {
  //   event.preventDefault();
  //   const columnName = inputRef.current?.value;
  //   setColumns((prev) => [...prev, { name: columnName!, tasks: [] }]);
  // }

  function handleAdd(event: React.FormEvent) {
    event.preventDefault();
    const uniqueId = Date.now();

    setColumns((prev) => [
      ...prev,
      <div key={uniqueId}>
        <BoardColumns
          key={uniqueId}
          name={inputRef.current?.value!}
          onDelete={() => handleDelete(uniqueId)}
        />
        {/* <input type="text" hidden readOnly name={inputRef.current?.value} /> */}
      </div>,
    ]);
  }

  const payload = updateBoard.bind(null, id);
  const [state, formAction] = useActionState(payload, null);

  const router = useRouter();

  return (
    <Overlay>
      <section className="bg-white dark:bg-secondary-dark-gray mx-4 w-full md:w-[480px] rounded-lg z-10">
        <h1 className="mx-6 dark:text-white font-bold text-[18px] text-primary-dark py-6">
          Edit Board
        </h1>

        <form
          onSubmit={() => {
            setTimeout(() => router.back(), 1000);
          }}
          action={formAction}
          className="mx-6"
        >
          <div className="flex flex-col">
            <label
              className="mb-2 text-[13px] text-secondary-gray font-bold"
              htmlFor="title"
            >
              Board Name
            </label>
            <input
              type="text"
              id="title"
              name="board-title"
              defaultValue={board.name}
              required
              placeholder="e.g. Web Design"
              className="w-full border dark:text-white outline-primary-violet focus:outline focus:border-0 dark:bg-secondary-dark-gray border-secondary-gray border-opacity-25 rounded-lg font-medium text-[13px] pl-4 py-2"
            />
            {state?.errors.name && (
              <div className="">
                <p className="text-[13px] md:text-[14px] text-tetiary-red">
                  {state.errors.name}
                </p>
              </div>
            )}
          </div>

          <div className="mt-6">
            <h1 className="mb-2 text-[13px] text-secondary-gray font-bold">
              Board Columns
            </h1>
            {columns}
            {/* {columns.map((column, index) => (
              <div key={index}>
                <BoardColumns
                  name={column.name}
                  key={index}
                  onDelete={() => handleDelete(column._id!)}
                />
                <input
                  type="hidden"
                  readOnly
                  name={column.name}
                  value={JSON.stringify(column.tasks)}
                />
              </div>
            ))} */}

            <button
              className=" text-primary-violet hover:bg-secondary-light-blue h-10 font-bold text-[13px] bg-tetiary-white-space w-[100%] mb-6 rounded-full"
              onClick={handleAdd}
            >
              +Add New Column
            </button>
          </div>
          <button className="block mb-4 text-white hover:bg-primary-light-violet h-10 font-bold text-[13px] bg-primary-violet w-[100%] rounded-full">
            Save Changes
          </button>
        </form>
      </section>
    </Overlay>
  );
}
