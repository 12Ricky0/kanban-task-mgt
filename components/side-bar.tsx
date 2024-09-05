import Image from "next/image";

export default function NavBar() {
  return (
    <nav className="bg-white rounded-lg mt-4 w-[80%] mx-auto pb-4">
      <div>
        <h1 className="text-[12px] text-secondary-gray font-bold tracking-[2.4px] mb-[19px] mx-6 pt-4">
          ALL BOARDS (3)
        </h1>
        <ul className="">
          <li className="bg-primary-violet h-12 flex items-center mr-6 rounded-r-full">
            <Image
              src="/assets/icon-board.svg"
              alt="board"
              width={16}
              height={16}
              className="inline-block mr-3 ml-6"
            />
            <span className="text-white text-[15px] font-medium">
              Platform Launch
            </span>
          </li>
          <li className=" h-12 flex items-center mr-6 rounded-r-full">
            <Image
              src="/assets/icon-board.svg"
              alt="board"
              width={16}
              height={16}
              className="inline-block mr-3 ml-6"
            />
            <span className="text-secondary-gray text-[15px] font-medium">
              Marketing Plan
            </span>
          </li>
          <li className=" h-12 flex items-center mr-6 rounded-r-full">
            <Image
              src="/assets/icon-board.svg"
              alt="board"
              width={16}
              height={16}
              className="inline-block mr-3 ml-6"
            />
            <span className="text-secondary-gray text-[15px] font-medium">
              Roadmap
            </span>
          </li>
          <li className=" h-12 flex items-center mr-6 rounded-r-full">
            <Image
              src="/assets/icon-board.svg"
              alt="board"
              width={16}
              height={16}
              className="inline-block mr-3 ml-6"
            />
            <span className="text-primary-violet text-[15px] font-medium">
              + Create New Board
            </span>
          </li>
        </ul>
      </div>

      <div className="bg-tetiary-white-space h-12 mt-4 flex items-center justify-center mx-4 rounded-lg">
        <Image
          src="/assets/icon-light-theme.svg"
          alt="light-theme"
          width={16}
          height={16}
          className="w-auto h-auto inline-block "
        />
        <div className="flex items-center mx-6">
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
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
    </nav>
  );
}
