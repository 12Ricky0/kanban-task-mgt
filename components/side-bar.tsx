"use client";
import Image from "next/image";
import { useContext } from "react";
import Link from "next/link";
import { Board } from "@/libs/definitions";
import { KanbanContext } from "@/context";

export default function NavBar({ boards }: { boards: Board[] }) {
  const {
    userboard,
    setUserBoard,
    darkMode,
    setDarkMode,
    displaySidebar,
    setDisplaySidebar,
  }: any = useContext(KanbanContext);

  return displaySidebar ? (
    <nav className="bg-white z-10 md:fixed dark:bg-secondary-dark-gray md:border-r dark:border-secondary-light-gray rounded-lg mt-4 w-[80%] md:flex flex-col  justify-between md:w-[260px] md:mx-0 md:rounded-none md:mt-0 md:h-full mx-auto pb-4">
      <div>
        <Link href="/">
          <Image
            src={`/assets/logo-${darkMode ? "light" : "dark"}.svg`}
            alt="Logo"
            width={24}
            height={25}
            className={`w-auto h-auto px-6 pt-[33px] pb-[54px]`}
          />
        </Link>
        <h1 className="text-[12px] text-secondary-gray font-bold tracking-[2.4px] mb-[19px] mx-6 pt-4">
          ALL BOARDS ({boards?.length})
        </h1>
        <ul className="cursor-pointer flex flex-col gap">
          {boards?.map((board) => (
            <li
              onClick={() => setUserBoard({ name: board.name, id: board._id })}
              key={board.name}
              className={` group  ${
                userboard.name == board.name
                  ? "bg-primary-violet"
                  : "hover:bg-secondary-light-blue"
              } h-12 flex items-center mr-6 rounded-r-full  `}
            >
              <Image
                src="/assets/icon-board.svg"
                alt="board"
                width={16}
                height={16}
                className="inline-block mr-3 ml-6"
              />
              <span
                className={` ${
                  userboard.name == board.name
                    ? "text-white"
                    : "text-[#828FA3] group-hover:text-primary-violet"
                } text-[15px] font-bold `}
              >
                {board.name}
              </span>
            </li>
          ))}
          <li className=" h-12 flex items-center mr-6 rounded-r-full">
            <Image
              src="/assets/icon-board.svg"
              alt="board"
              width={16}
              height={16}
              className="inline-block mr-3 ml-6"
            />
            <Link href="/createboard">
              <span className="text-primary-violet hover:text-primary-light-violet text-[15px] font-bold">
                + Create New Board
              </span>
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <div className="bg-tetiary-white-space dark:bg-primary-semi-dark h-12 mt-4 flex items-center justify-center mx-4 rounded-lg">
          <Image
            src="/assets/icon-light-theme.svg"
            alt="light-theme"
            width={16}
            height={16}
            className="w-auto h-auto inline-block "
          />
          <div className="flex items-center mx-6">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                onChange={() => setDarkMode(!darkMode)}
                checked={darkMode}
                type="checkbox"
                className="sr-only peer"
              />
              <div className="w-[40px] h-[20px] bg-primary-violet peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 dark:bg-gray-700 peer-checked:bg-primary-light-violet rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[14px] after:w-[14px] after:transition-all dark:border-gray-600 peer-checked:after:border-white"></div>
            </label>
          </div>

          <Image
            src="/assets/icon-dark-theme.svg"
            alt="light-theme"
            width={16}
            height={16}
            className="inline-block w-auto h-auto"
          />
        </div>

        <div className="hover:bg-secondary-light-blue group hidden   h-12 md:flex mt-[30px] items-center mr-6 rounded-r-full">
          <div
            onClick={() => setDisplaySidebar(!displaySidebar)}
            className="hidden cursor-pointer md:flex items-center "
          >
            <Image
              src="/assets/icon-hide-sidebar.svg"
              alt="board"
              width={16}
              height={16}
              className="inline-block w-auto h-auto mr-3 ml-6"
            />
            <span className="text-secondary-gray group-hover:text-primary-violet  text-[15px] font-bold">
              Hide Sidebar
            </span>
          </div>
        </div>
      </div>
    </nav>
  ) : (
    <div
      onClick={() => setDisplaySidebar(!displaySidebar)}
      className="bg-primary-violet fixed bottom-0 w-[56px] cursor-pointer h-[48px] z-10 md:flex items-center justify-center hidden rounded-r-full"
    >
      <Image
        src="/assets/icon-show-sidebar.svg"
        alt="board"
        width={16}
        height={16}
        className="w-auto h-auto"
      />
    </div>
  );
}
