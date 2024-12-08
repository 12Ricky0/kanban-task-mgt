"use client";
import { Overlay } from "../overlay";
import { useState, useActionState, ChangeEvent } from "react";
import { BoardColumns } from "./subtask";
import { createBoard } from "@/libs/actions";
import { useRouter } from "next/navigation";
export default function BoardForm() {
  const [columns, setColumns] = useState([
    { id: 0, name: "Todo" },
    { id: 1, name: "Doing" },
  ]);

  function handleDelete(key: number) {
    setColumns((prev) => {
      return prev.filter((_, i) => i !== key);
    });
  }

  function handleAdd(event: React.FormEvent) {
    event.preventDefault();
    setColumns((prev) => [...prev, { id: prev.length, name: "New" }]);
  }

  const [state, formAction, isPending] = useActionState(createBoard, null);
  const [formData, setFormData] = useState({ "board-title": "" });
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Overlay>
      <section className="bg-white dark:bg-secondary-dark-gray mx-4 w-full md:w-[480px] rounded-lg z-10">
        <h1 className="mx-6 font-bold text-[18px] dark:text-white text-primary-dark py-6">
          Add New Board
        </h1>

        <form
          onSubmit={() => {
            if (formData["board-title"]) {
              setTimeout(() => router.back(), 1000);
            }
          }}
          action={formAction}
          className="mx-6"
        >
          <div className="flex flex-col">
            <label
              className="mb-2 text-[13px] dark:text-white text-secondary-gray font-bold"
              htmlFor="title"
            >
              Board Name
            </label>
            <input
              type="text"
              id="title"
              name="board-title"
              value={formData["board-title"]}
              onChange={handleChange}
              placeholder="e.g. Web Design"
              className="w-full border dark:text-white dark:bg-secondary-dark-gray outline-primary-violet focus:outline focus:border-0 border-secondary-gray border-opacity-25 rounded-lg font-medium text-[13px] pl-4 py-2"
            />
            {state?.errors?.name && (
              <div className="">
                <p className="text-[13px] md:text-[14px] text-tetiary-red">
                  {state.errors.name}
                </p>
              </div>
            )}
          </div>

          <div className="mt-6">
            <h1 className="mb-2 text-[13px] dark:text-white text-secondary-gray font-bold">
              Board Columns
            </h1>
            {columns.map((column) => (
              <BoardColumns
                name={column.name}
                key={column.id}
                onDelete={() => handleDelete(column.id)}
              />
            ))}

            <button
              className=" text-primary-violet hover:bg-secondary-light-blue h-10 font-bold text-[13px] bg-tetiary-white-space w-[100%] mb-6 rounded-full"
              onClick={handleAdd}
            >
              +Add New Column
            </button>
          </div>
          <button
            type="submit"
            className="block mb-4 text-white hover:bg-primary-light-violet h-10 font-bold text-[13px] bg-primary-violet w-[100%] rounded-full"
          >
            {isPending ? "Submitting..." : "Create New Board"}
          </button>
        </form>
      </section>
    </Overlay>
  );
}
