"use client";
import Link from "next/link";
import { useContext, useActionState, ChangeEvent, useState } from "react";
import { KanbanContext } from "@/context";
import Image from "next/image";
import { registerUser } from "@/libs/actions";

export default function SignupForm() {
  const { darkMode }: any = useContext(KanbanContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeat_password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const [state, formAction] = useActionState(registerUser, null);

  return (
    <div>
      <Image
        src={`/assets/logo-${darkMode ? "light" : "dark"}.svg`}
        alt="Logo"
        width={24}
        height={25}
        className={`w-auto h-auto mx-auto  mb-[24px]`}
      />

      <section className=" bg-white p-6 dark:bg-secondary-dark-gray w-full md:w-[400px] rounded-lg">
        <h1 className="text-[24px] text-primary-violet font-bold  mb-[19px] text-center">
          Sign up
        </h1>

        <form action={formAction} className="flex flex-col ">
          <div className="mb-6">
            <label
              className="mb-2 text-[13px] dark:text-white text-secondary-gray font-bold"
              htmlFor="email"
            >
              Email
            </label>

            <input
              className={`w-full border  ${
                state?.errors?.email
                  ? "border-red-500"
                  : "border-secondary-gray"
              } outline-primary-violet focus:outline focus:border-0 dark:text-white dark:bg-secondary-dark-gray border-opacity-25 rounded-lg font-medium text-[13px] pl-4 py-2`}
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
            />

            {state?.errors?.email && (
              <div className="">
                <p className="text-[13px] md:text-[14px] text-tetiary-red">
                  {state.errors.email}
                </p>
              </div>
            )}
          </div>

          <div className=" mb-6">
            <label
              className="mb-2 text-[13px] dark:text-white text-secondary-gray font-bold"
              htmlFor="password"
            >
              Password
            </label>

            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
              className="w-full border border-secondary-gray outline-primary-violet focus:outline focus:border-0 dark:text-white dark:bg-secondary-dark-gray border-opacity-25 rounded-lg font-medium text-[13px] pl-4 py-2"
            />
            {state?.errors?.password && (
              <div className="">
                <p className="text-[13px] md:text-[14px] text-tetiary-red">
                  {state.errors.password}
                </p>
              </div>
            )}
          </div>
          <div className="mb-6">
            <label
              className="pb-6 text-[13px] dark:text-white text-secondary-gray font-bold"
              htmlFor="repeat-password"
            >
              Repeat Password
            </label>

            <input
              type="password"
              value={formData.repeat_password}
              onChange={handleChange}
              name="repeat_password"
              placeholder="Repeat Password"
              className="w-full border border-secondary-gray outline-primary-violet focus:outline focus:border-0 dark:text-white dark:bg-secondary-dark-gray border-opacity-25 rounded-lg font-medium text-[13px] pl-4 py-2"
            />
            {state?.message && (
              <div className="">
                <p className="text-[13px] md:text-[14px] text-tetiary-red">
                  {state.message}
                </p>
              </div>
            )}
          </div>
          <button
            onSubmit={(e) => e.preventDefault()}
            className="bg-primary-violet hover:bg-primary-light-violet h-9 md:h-auto w-auto md:py-[10px] cursor-pointer  md:px-6 rounded-3xl flex items-center justify-center text-white md:block text-[15px] font-semibold"
            type="submit"
          >
            Create an Account
          </button>
        </form>

        <p className="text-center dark:text-white font-medium text-secondary-gray mt-6 text-tetiary-gray">
          Already have an account?{" "}
          <Link
            className="font-bold text-primary-violet hover:text-primary-light-violet"
            href="/login"
          >
            Login
          </Link>
        </p>
      </section>
    </div>
  );
}
