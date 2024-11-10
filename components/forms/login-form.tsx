"use client";
import Link from "next/link";
import { useContext } from "react";
import { KanbanContext } from "@/context";
import Image from "next/image";

export default function LoginForm() {
  const { darkMode }: any = useContext(KanbanContext);
  return (
    <div>
      <Image
        src={`/assets/logo-${darkMode ? "light" : "dark"}.svg`}
        alt="Logo"
        width={24}
        height={25}
        className={`w-auto h-auto mx-auto  mb-[24px]`}
      />

      <section className=" bg-white p-6 dark:bg-secondary-dark-gray w-full md:w-[400px] mx-6 rounded-lg">
        <h1 className="text-[24px] text-primary-violet font-bold tracking-[2.4px] mb-[19px] text-center">
          Login
        </h1>
        <form className="flex flex-col ">
          <label
            className="mb-2 text-[13px] dark:text-white text-secondary-gray font-bold"
            htmlFor="email"
          >
            Email
          </label>

          <input
            className="w-full border mb-6 border-secondary-gray outline-primary-violet focus:outline focus:border-0 dark:text-white dark:bg-secondary-dark-gray border-opacity-25 rounded-lg font-medium text-[13px] pl-4 py-2"
            type="email"
            name="email"
            placeholder="Email"
            required
          />

          <label
            className="mb-2 text-[13px] dark:text-white text-secondary-gray font-bold"
            htmlFor="password"
          >
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full border mb-6 border-secondary-gray outline-primary-violet focus:outline focus:border-0 dark:text-white dark:bg-secondary-dark-gray border-opacity-25 rounded-lg font-medium text-[13px] pl-4 py-2"
          />
          <button
            className="bg-primary-violet hover:bg-primary-light-violet h-9 md:h-auto w-auto md:py-[10px] cursor-pointer  md:px-6 rounded-3xl flex items-center justify-center text-white md:block text-[15px] font-semibold"
            type="submit"
          >
            Login
          </button>
        </form>

        <p className="text-center dark:text-white font-medium text-secondary-gray mt-6 text-tetiary-gray">
          Don't have an account?{" "}
          <Link
            className="font-bold text-primary-violet hover:text-primary-light-violet"
            href="/signup"
          >
            Sign up
          </Link>
        </p>
      </section>
    </div>
  );
}