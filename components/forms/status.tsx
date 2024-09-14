"use client";
import Image from "next/image";
import { useState } from "react";

export default function Status() {
  const options = ["Todo", "Doing", "Done"];

  const [displayOptions, setDisplayOptions] = useState(false);

  const [task, setTask] = useState("Todo");

  return (
    <div onClick={() => setDisplayOptions(!displayOptions)}>
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
    </div>
  );
}
