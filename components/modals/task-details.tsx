"use client";

import Image from "next/image";
import { Overlay } from "../overlay";
import { Subtask_List } from "../subtask-card";
import Status from "../forms/status";
import { useState } from "react";
import { Tasks } from "@/libs/definitions";
import { Board } from "@/libs/definitions";
import Popup from "../subtask-card";
import DeleteModal from "./delete";
import { deleteModel } from "mongoose";
import { useRouter } from "next/navigation";
export default function Details({ data }: { data: Tasks }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const completed = data.subtasks.filter(
    (task) => task.isCompleted === true
  ).length;

  return (
    <Overlay>
      <section
        className={`bg-white md:w-[480px] rounded-lg mx-4 pt-6 pb-8 ${
          showDeleteModal ? "hidden" : "block"
        }`}
      >
        <article className="mx-6">
          <div>
            <div className="flex justify-between items-center gap-6 mb-6">
              <h1 className="font-bold text-primary-dark md:text-[20px]">
                {data.title}
              </h1>
              <Image
                src="/assets/icon-vertical-ellipsis.svg"
                alt="vertical-ellipsis"
                width={3.69}
                height={16}
                className="cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              />
              {/* <Popup className="translate-y-[80px] bg-primary-violet left-[850px]" /> */}
            </div>
            {showDropdown && (
              <section
                className={` absolute bg-white w-[192px] md:translate-x-[350px] translate-x-28 rounded-lg shadow-lg justify-end -translate-y-[32px] py-4`}
              >
                <button className="block ml-4 mb-4 text-[13px] font-medium text-secondary-gray">
                  Edit Task
                </button>
                <button
                  onClick={() => {
                    setShowDeleteModal(!deleteModel);
                    setShowDropdown(!showDropdown);
                  }}
                  className="ml-4 text-[13px] font-medium text-tetiary-red"
                >
                  Delete Task
                </button>
              </section>
            )}{" "}
          </div>
          <p className="text-[13px] text-secondary-gray font-medium mb-6">
            {data.description}
          </p>

          <h2 className="mb-4 text-[13px] text-secondary-gray font-bold">
            Subtasks ({completed} of {data.subtasks.length})
          </h2>

          <div className="mb-6">
            <Subtask_List subtasks={data.subtasks} />
          </div>
          <div>
            <h1 className="mb-2 text-[13px] text-secondary-gray font-bold">
              Current Status
            </h1>
            <Status defautValue={data.status} />
          </div>
        </article>
      </section>
      {showDeleteModal && <DeleteModal type="Task" title={data.title} />}
    </Overlay>
  );
}
