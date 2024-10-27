import Image from "next/image";
import { ReactEventHandler } from "react";

export default function SubtaskForm({
  index,
  onDelete,
}: {
  index: number;
  onDelete: (index: number) => void;
}) {
  function handleDelete() {
    onDelete(index);
  }
  return (
    <div className="flex gap-4 items-center mb-3">
      <input
        type="text"
        id="subtask"
        name="subtask"
        placeholder="e.g. Make coffee"
        className="w-full border border-secondary-gray border-opacity-25 rounded-lg font-medium text-[13px] pl-4 py-2"
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
}: {
  name: string;
  onDelete: () => void;
}) {
  return (
    <section className="flex gap-4 items-center mb-3">
      <input
        type="text"
        id="column"
        name="column"
        placeholder="e.g. Make coffee"
        defaultValue={name}
        className="w-full border border-secondary-gray border-opacity-25 rounded-lg font-medium text-[13px] pl-4 py-2"
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
