import Image from "next/image";

export default function SubtaskForm({ index }: { index: number }) {
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
        className="w-auto h-auto"
      />
    </div>
  );
}
