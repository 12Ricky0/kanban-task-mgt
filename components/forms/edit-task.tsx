"use client";

import { Overlay } from "../overlay";
import SubtaskForm from "./subtask";
import { ReactEventHandler, useState, useActionState, useContext } from "react";
import Image from "next/image";
import Status from "./status";
import { updateTask } from "@/libs/actions";
import { KanbanContext } from "@/context";
import { Tasks } from "@/libs/definitions";

export default function Edit_Task_Form({
  options,
  task,
  id,
  column_id,
}: {
  options: string[];
  task: Tasks;
  id: string;
  column_id: string;
}) {
  const [subtasks, setSubtasks] = useState<JSX.Element[]>(
    task.subtasks.map((t) => (
      <div key={t._id}>
        <SubtaskForm
          defaultValue={t.title}
          key={t._id}
          index={t._id!}
          onDelete={() =>
            setSubtasks((prev) =>
              prev.filter((subtask) => subtask.key !== t._id)
            )
          }
        />
        <input
          type="text"
          hidden
          readOnly
          name="completed"
          value={JSON.stringify(t.isCompleted)}
        />
      </div>
    ))
  );
  //   const { userboard }: any = useContext(KanbanContext);

  const payload = updateTask.bind(null, id);

  const [state, formAction] = useActionState(payload, null);

  function handleAdd(event: React.FormEvent) {
    event.preventDefault();
    const uniqueId = Date.now();

    setSubtasks((prev) => [
      ...prev,
      <div key={uniqueId}>
        <SubtaskForm
          key={uniqueId}
          index={uniqueId}
          onDelete={() => handleDelete(uniqueId)}
        />
        <input
          type="text"
          hidden
          readOnly
          name="completed"
          value={JSON.stringify(false)}
        />
      </div>,
    ]);
  }

  function handleDelete(id: number) {
    setSubtasks((prev) =>
      prev.filter((subtask) => subtask.key !== id.toString())
    );
  }
  return (
    <Overlay>
      <section className="bg-white dark:bg-secondary-dark-gray z-50 mx-4 w-full md:w-[480px] rounded-lg">
        <h1 className="mx-6 font-bold text-[18px] dark:text-white text-primary-dark py-6">
          Edit Task
        </h1>

        <form action={formAction} className="mx-6">
          <div className="flex flex-col">
            <label
              className="mb-2 text-[13px] dark:text-white text-secondary-gray font-bold"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="e.g. Take coffee break"
              defaultValue={task.title}
              className="w-full border border-secondary-gray dark:text-white dark:bg-secondary-dark-gray border-opacity-25 rounded-lg font-medium text-[13px] pl-4 py-2"
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
              className="mb-2 text-[13px] dark:text-white text-secondary-gray font-bold"
              htmlFor="des"
            >
              Description
            </label>
            <textarea
              id="des"
              rows={4}
              name="description"
              defaultValue={task.description}
              placeholder="e.g. It’s always good to take a break. This 
15 minute break will  recharge the batteries 
a little."
              className="w-full border dark:text-white dark:bg-secondary-dark-gray leading-[23px] border-opacity-25 border-secondary-gray rounded-lg font-medium text-[13px] px-4 py-2"
            />
          </div>

          <div className="mt-6">
            <h1 className="mb-2 text-[13px] dark:text-white text-secondary-gray font-bold">
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
            <h1 className="mb-2 text-[13px] dark:text-white text-secondary-gray font-bold">
              Status
            </h1>
            <Status options={options} defautValue={task.status} />
            {state?.errors.status && (
              <div className="">
                <p className="text-[13px] md:text-[14px] text-tetiary-red">
                  {state.errors.status}
                </p>
              </div>
            )}
            <input
              type="text"
              name="column-id"
              value={column_id}
              hidden
              readOnly
            />
          </div>

          <button className="block mb-4 text-white hover:bg-primary-light-violet h-10 font-bold text-[13px] bg-primary-violet w-[100%] rounded-full">
            Save Task
          </button>
        </form>
      </section>
    </Overlay>
  );
}
