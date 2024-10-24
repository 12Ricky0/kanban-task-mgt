"use client";

import { Overlay } from "../overlay";
import SubtaskForm from "../forms/subtask";
import { ReactEventHandler, useState } from "react";
import Image from "next/image";
import Status from "../forms/status";

export default function TaskForm() {
  const [subtasks, setSubtasks] = useState<JSX.Element[]>([]);

  // const options = ["Todo", "Doing", "Done"];

  // const [displayOptions, setDisplayOptions] = useState(false);

  // const [task, setTask] = useState("Todo");

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

        <form action="" className="mx-6">
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
              name="des"
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
            <Status />
            {/* <div onClick={() => setDisplayOptions(!displayOptions)}>
              <div className="w-full border border-secondary-gray hover:border-primary-violet cursor-pointer border-opacity-25 rounded-lg font-medium text-[13px] px-4 py-2 flex justify-between items-center">
                <input
                  type="text"
                  readOnly
                  value={task}
                  className="border-0 focus:outline-none"
                />
                <Image
                  src="/assets/icon-chevron-down.svg"
                  alt="arrow-down"
                  width={8}
                  height={4}
                  className="inline-block "
                />
              </div>

              {displayOptions && (
                <ul className="bg-white rounded-lg py-4 last:mb-0 absolute mt-[10px] w-[80%] md:w-[430px] shadow-lg">
                  {options.map((option) => (
                    <li
                      onClick={() => setTask(option)}
                      className="text-secondary-gray mb-2 ml-4 font-medium"
                      key={options.indexOf(option)}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div> */}
          </div>

          <button className="block mb-4 text-white hover:bg-primary-light-violet h-10 font-bold text-[13px] bg-primary-violet w-[100%] rounded-full">
            Create Task
          </button>
        </form>
      </section>
    </Overlay>
  );
}
