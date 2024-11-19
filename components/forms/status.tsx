"use client";
import Image from "next/image";
import { useState } from "react";

export default function Status({
  defautValue,
  options,
}: {
  defautValue?: string;
  options: string[];
}) {
  const [displayOptions, setDisplayOptions] = useState(false);

  const [task, setTask] = useState(defautValue);

  return (
    <div onClick={() => setDisplayOptions(!displayOptions)}>
      <div className="w-full border border-secondary-gray  hover:border-primary-violet cursor-pointer border-opacity-25 rounded-lg font-medium text-[13px] px-4 py-2 flex justify-between items-center">
        <input
          type="text"
          name="status"
          readOnly
          defaultValue={task}
          className="border-0 focus:outline-none dark:bg-secondary-dark-gray dark:text-white"
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
        <ul className="bg-white dark:bg-secondary-dark-gray rounded-lg cursor-pointer py-4 last:mb-0 absolute mt-[10px] w-[50%] md:w-[430px] shadow-lg">
          {options.map((option) => (
            <li
              onClick={() => setTask(option)}
              className="text-secondary-gray dark:text-white mb-2 ml-4 font-medium"
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
