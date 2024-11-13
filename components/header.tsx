"use client";
import Image from "next/image";
import { useContext, useState } from "react";
import Popup from "./subtask-card";
import { KanbanContext } from "@/context";
import NavBar from "./side-bar";
import TaskForm from "./forms/task-form";
import Link from "next/link";
import { Board } from "@/libs/definitions";
import { PowerIcon } from "@heroicons/react/24/solid";
import { signOut, signIn } from "next-auth/react";

export default function Header({ boards }: { boards: Board[] }) {
  const {
    displayMenu,
    setDisplayMenu,
    userboard,
    showActionButtons,
    setShowActionButtons,
    darkMode,
    displaySidebar,
  }: any = useContext(KanbanContext);
  const [showButton, setShowButton] = useState(false);

  return (
    <section
      className={`${
        displaySidebar ? "md:pt-[20px] md:pb-[28px]" : "pt-0 pb-0 "
      } bg-white ${
        displaySidebar && "ml-[260x] "
      } dark:bg-secondary-dark-gray md:border-b fixed w-full top-0  dark:border-secondary-light-gray`}
    >
      <header className="  flex py-[20px] md:py-0 justify-between items-center">
        <div className="inline-flex ml-4 md:ml-6 gap-4 md:gap-6">
          <Image
            src="/assets/logo-mobile.svg"
            alt="Logo"
            width={24}
            height={25}
            className="block md:hidden"
          />

          {!displaySidebar && (
            <div className="hidden md:inline-flex border-r dark:border-secondary-light-gray py-10 items-center">
              <Image
                src={`/assets/logo-${darkMode ? "light" : "dark"}.svg`}
                alt="Logo"
                width={24}
                height={25}
                className={`w-auto h-auto  pr-[24px]`}
              />
            </div>
          )}
          <div className="md:inline-flex hidden gap-2 items-center">
            <h1
              className={`text-[18px] ${
                displaySidebar && " pl-[260px]"
              } dark:text-white md:text-[24px] leading-normal font-bold`}
            >
              {userboard.name}
            </h1>
          </div>
          <div
            onClick={() => setDisplayMenu(!displayMenu)}
            className="inline-flex md:hidden gap-2 items-center"
          >
            <h1 className="text-[18px]  md:text-[24px] dark:text-white leading-normal font-bold">
              {userboard.name}
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
            <Link href={`/createtask/${userboard.id}`}>
              <div className="bg-primary-violet hover:bg-primary-light-violet w-12 h-8 md:h-auto md:w-auto md:py-[15px] cursor-pointer  md:px-6 rounded-3xl flex items-center justify-center">
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
            </Link>
            <Image
              src="/assets/icon-vertical-ellipsis.svg"
              alt="vertical-ellipsis"
              width={3.69}
              height={16}
              className="cursor-pointer"
              onClick={() => setShowActionButtons(!showActionButtons)}
            />
            <PowerIcon
              onClick={() => setShowButton(!showButton)}
              className="md:size-7 size-6 dark:text-white cursor-pointer"
            />
          </div>
          {showActionButtons && (
            <Popup type={userboard.name} id={userboard.id} />
          )}
        </div>
      </header>
      {displayMenu && (
        <div className="absolute w-full">
          <NavBar boards={boards} />
        </div>
      )}
      {showButton && (
        <div className="absolute bg-white dark:bg-primary-semi-dark p-6 font-bold text-[18px] right-0 rounded-lg shadow-lg flex flex-col gap-2 mr-6 mt-5 ">
          <button
            className="text-secondary-gray hover:text-green-400 font-bold"
            onClick={() => signIn("github", { redirectTo: "/" })}
          >
            Login
          </button>
          <button
            className="hover:text-red-400 text-secondary-gray"
            onClick={() => signOut()}
          >
            Logout
          </button>
        </div>
      )}
    </section>
  );
}
