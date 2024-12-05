"use client";
import Link from "next/link";
import { useContext, useActionState, useState, ChangeEvent } from "react";
import { KanbanContext } from "@/context";
import Image from "next/image";
import { authenticate } from "@/libs/actions";
import { useRouter } from "next/navigation";

export default function LoginForm({ token }: { token: string }) {
  const { darkMode }: any = useContext(KanbanContext);
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

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
        <h1 className="text-[24px] text-primary-violet font-bold tracking-[2.4px] mb-[19px] text-center">
          {token ? "Welcome" : "Login"}
        </h1>
        <p
          className={`mb-6 ${
            token ? "block" : "hidden"
          } text-[13px] text-center dark:text-white text-secondary-gray font-bold`}
        >
          {token}
        </p>
        {!token && (
          <form action={formAction} className="flex flex-col ">
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
              value={formData.email}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
              className="w-full border mb-6 border-secondary-gray outline-primary-violet focus:outline focus:border-0 dark:text-white dark:bg-secondary-dark-gray border-opacity-25 rounded-lg font-medium text-[13px] pl-4 py-2"
            />
            <button
              aria-disabled={isPending}
              className="bg-primary-violet hover:bg-primary-light-violet h-9 md:h-auto w-auto md:py-[10px] cursor-pointer  md:px-6 rounded-3xl flex items-center justify-center text-white md:block text-[15px] font-semibold"
              type="submit"
            >
              Login
            </button>

            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {state && (
                <>
                  <p className="text-sm text-red-500">{state}</p>
                </>
              )}
            </div>
          </form>
        )}
        {token && (
          <button
            className="bg-primary-violet hover:bg-primary-light-violet h-9 md:h-auto w-[100%] md:py-[10px] cursor-pointer  md:px-6 rounded-3xl flex items-center justify-center text-white md:block text-[15px] font-semibold"
            onClick={() => {
              router.replace("/");
              setTimeout(() => window.location.reload(), 1000);
            }}
          >
            Load Kanban
          </button>
        )}
        {!token && (
          <p className="text-center dark:text-white font-medium text-secondary-gray mt-6 text-tetiary-gray">
            Don`t have an account?{" "}
            <Link
              className="font-bold text-primary-violet hover:text-primary-light-violet"
              href="/signup"
            >
              Sign up
            </Link>
          </p>
        )}
      </section>
    </div>
  );
}
