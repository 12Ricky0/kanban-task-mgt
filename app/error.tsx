"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <section className="flex items-center flex-col justify-center py-[110px] mb-[55px] text-center  mx-6 md:mx-0 mt-4 rounded-lg">
      <article className="mt-[53px]">
        <h1 className="font-bold text-[24px] text-secondary-dark-gray mb-4">
          Something went wrong!{" "}
        </h1>
      </article>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        className="bg-primary-voilet text-[13px] font-bold dark:text-white text-secondary-gray h-10 mt-12 rounded-lg w-[134px]"
      >
        Try again
      </button>
    </section>
  );
}
