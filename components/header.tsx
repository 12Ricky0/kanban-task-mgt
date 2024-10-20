"use client";
import Image from "next/image";
import { useState, useContext } from "react";
import Popup from "./subtask-card";
import { KanbanContext } from "@/context";
import NavBar from "./side-bar";
import TaskForm from "./modals/task-form";

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { displayMenu, setDisplayMenu, displayTaskForm, setDisplayTaskForm } =
    useContext(KanbanContext);

  return (
    <section>
      <header className="bg-white dark:bg-black md:border-b flex py-[20px] md:py-0 justify-between items-center">
        <div className="inline-flex ml-4 md:ml-6 gap-4 md:gap-6">
          <Image
            src="/assets/logo-mobile.svg"
            alt="Logo"
            width={24}
            height={25}
            className="block md:hidden"
          />

          <div className="hidden md:inline-flex border-r py-10 items-center">
            <Image
              src="/assets/logo-dark.svg"
              alt="Logo"
              width={24}
              height={25}
              className={`w-auto h-auto  pr-[24px]`}
            />
            {/* <div className="border-r hidden md:block h-[80px]" /> */}
          </div>

          <div
            onClick={() => setDisplayMenu(!displayMenu)}
            className="inline-flex gap-2 items-center"
          >
            <h1 className="text-[18px] md:text-[20px] leading-normal font-bold">
              Platform Launch
            </h1>
            <Image
              src={`/assets/icon-chevron-${displayMenu ? "up" : "down"}.svg`}
              alt="arrow-down"
              width={8}
              height={4}
              className="inline-block md:hidden"
            />
          </div>
        </div>

        <div>
          <div className="inline-flex items-center mr-4 md:mr-6 gap-4 md:gap-6">
            <div
              onClick={() => setDisplayTaskForm(!displayTaskForm)}
              className="bg-primary-violet w-12 h-8 md:h-auto md:w-auto md:py-[15px] cursor-pointer  md:px-6 rounded-3xl flex items-center justify-center"
            >
              <Image
                src="/assets/icon-add-task-mobile.svg"
                alt="add-task"
                width={12}
                height={12}
                className="inline-block md:hidden"
              />
              <span className="text-white hidden md:block text-[15px] font-semibold">
                + Add New Task
              </span>
            </div>
            <Image
              src="/assets/icon-vertical-ellipsis.svg"
              alt="vertical-ellipsis"
              width={3.69}
              height={16}
              className="cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            />
          </div>
          {showDropdown && <Popup />}
        </div>
      </header>
      {displayMenu && (
        <div className="absolute w-full">
          <NavBar />
        </div>
      )}
      {displayTaskForm && (
        <div className="absolute w-full">
          <TaskForm />
        </div>
      )}
    </section>
  );
}
