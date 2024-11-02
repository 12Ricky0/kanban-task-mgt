"use client";

import { Overlay } from "../overlay";
import SubtaskForm from "./subtask";
import { ReactEventHandler, useState, useActionState, useContext } from "react";
import Image from "next/image";
import Status from "./status";
import { createTask } from "@/libs/actions";
import { KanbanContext } from "@/context";

export default function TaskForm({ options }: { options: string[] }) {
  const [subtasks, setSubtasks] = useState<JSX.Element[]>([]);
  const { userboard }: any = useContext(KanbanContext);

  const payload = createTask.bind(null, userboard.id);

  const [state, formAction] = useActionState(payload, null);

  function handleDelete(key: number) {
    setSubtasks((prev) => {
      return prev.filter((_, i) => i !== key);
    });
  }

  function handleAdd(event: React.FormEvent) {
    event.preventDefault();
    setSubtasks([
      ...subtasks,
      <SubtaskForm
        key={subtasks.length}
        index={subtasks.length}
        onDelete={handleDelete}
      />,
    ]);
  }
  return (
    <Overlay>
      <section className="bg-white z-50 mx-4 w-full md:w-[480px] rounded-lg">
        <h1 className="mx-6 font-bold text-[18px] text-primary-dark py-6">
          Add New Task
        </h1>

        <form action={formAction} className="mx-6">
          <div className="flex flex-col">
            <label
              className="mb-2 text-[13px] text-secondary-gray font-bold"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="e.g. Take coffee break"
              className="w-full border border-secondary-gray border-opacity-25 rounded-lg font-medium text-[13px] pl-4 py-2"
            />
            {state?.errors.title && (
              <div className="">
                <p className="text-[13px] md:text-[14px] text-tetiary-red">
                  {state.errors.title}
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-col mt-6">
            <label
              className="mb-2 text-[13px] text-secondary-gray font-bold"
              htmlFor="des"
            >
              Description
            </label>
            <textarea
              id="des"
              rows={4}
              name="description"
              placeholder="e.g. It’s always good to take a break. This 
15 minute break will  recharge the batteries 
a little."
              className="w-full border leading-[23px] border-opacity-25 border-secondary-gray rounded-lg font-medium text-[13px] px-4 py-2"
            />
          </div>

          <div className="mt-6">
            <h1 className="mb-2 text-[13px] text-secondary-gray font-bold">
              Subtasks
            </h1>
            {subtasks}

            <button
              className=" text-primary-violet hover:bg-secondary-light-blue h-10 font-bold text-[13px] bg-tetiary-white-space w-[100%] rounded-full"
              onClick={handleAdd}
            >
              +Add New Subtask
            </button>
          </div>

          <div className="flex flex-col py-6">
            <h1 className="mb-2 text-[13px] text-secondary-gray font-bold">
              Status
            </h1>
            <Status options={options} />
            {state?.errors.status && (
              <div className="">
                <p className="text-[13px] md:text-[14px] text-tetiary-red">
                  {state.errors.status}
                </p>
              </div>
            )}
          </div>

          <button className="block mb-4 text-white hover:bg-primary-light-violet h-10 font-bold text-[13px] bg-primary-violet w-[100%] rounded-full">
            Create Task
          </button>
        </form>
      </section>
    </Overlay>
  );
}
