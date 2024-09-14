"use client";

import Image from "next/image";
import { Overlay } from "../overlay";
import { Subtask_List } from "../subtask-card";
import Status from "../forms/status";
import { useState } from "react";
import Popup from "../subtask-card";
export default function Details() {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <Overlay>
      <section className="bg-white md:w-[480px] rounded-lg mx-4 pt-6 pb-8">
        <article className="mx-6">
          <div>
            <div className="flex items-center gap-6 mb-6">
              <h1 className="font-bold text-primary-dark md:text-[20px]">
                Research pricing points of various competitors and trial
                different business models
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
                  Edit Board
                </button>
                <button className="ml-4 text-[13px] font-medium text-tetiary-red">
                  Delete Board
                </button>
              </section>
            )}{" "}
          </div>
          <p className="text-[13px] text-secondary-gray font-medium mb-6">
            We know what we`re planning to build for version one. Now we need to
            finalise the first pricing model we`ll use. Keep iterating the
            subtasks until we have a coherent proposition.
          </p>

          <h2 className="mb-4 text-[13px] text-secondary-gray font-bold">
            Subtasks (2 of 3)
          </h2>

          <div className="mb-6">
            <Subtask_List />
          </div>
          <div>
            <h1 className="mb-2 text-[13px] text-secondary-gray font-bold">
              Current Status
            </h1>
            <Status />
          </div>
        </article>
      </section>
    </Overlay>
  );
}
