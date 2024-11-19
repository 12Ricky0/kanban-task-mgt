"use client";
import Image from "next/image";

export default function SubtaskForm({
  index,
  onDelete,
  defaultValue,
}: {
  index: any;
  defaultValue?: string;
  onDelete: (index: any) => void;
}) {
  function handleDelete() {
    onDelete(index);
  }

  return (
    <div className="flex gap-4 items-center mb-3">
      <input
        type="text"
        id={`subtask` + index}
        name="subtask"
        defaultValue={defaultValue}
        placeholder="e.g. Make coffee"
        className="w-full border border-secondary-gray outline-primary-violet focus:outline focus:border-0 dark:bg-secondary-dark-gray dark:text-white border-opacity-25 rounded-lg font-medium text-[13px] pl-4 py-2"
      />
      <Image
        src="/assets/icon-cross.svg"
        alt="cross"
        width={16}
        height={16}
        className="w-auto h-auto cursor-pointer"
        onClick={handleDelete}
      />
    </div>
  );
}

export function BoardColumns({
  name,
  onDelete,
  inputRef,
}: {
  name: string;
  onDelete: () => void;
  inputRef?: React.RefObject<HTMLInputElement>;
}) {
  return (
    <section className="flex gap-4 items-center mb-3">
      <input
        type="text"
        id={`column` + name}
        name="column"
        ref={inputRef}
        placeholder="e.g. Make coffee"
        defaultValue={name}
        className="w-full border border-secondary-gray outline-primary-violet focus:outline focus:border-0 dark:text-white dark:bg-secondary-dark-gray border-opacity-25 rounded-lg font-medium text-[13px] pl-4 py-2"
      />
      <Image
        src="/assets/icon-cross.svg"
        alt="cross"
        width={16}
        height={16}
        className="w-auto h-auto cursor-pointer"
        onClick={onDelete}
      />
    </section>
  );
}
