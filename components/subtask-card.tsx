export default function Popup({ className }: { className?: string }) {
  return (
    <section
      className={`${className} absolute bg-white w-[192px] right-5 md:right-0 rounded-lg shadow-lg justify-end mt-5 py-4`}
    >
      <button className="block ml-4 mb-4 text-[13px] font-medium text-secondary-gray">
        Edit Board
      </button>
      <button className="ml-4 text-[13px] font-medium text-tetiary-red">
        Delete Board
      </button>
    </section>
  );
}

export function Subtask_List() {
  return (
    <section className="flex gap-4 bg-secondary-light-blue px-3 pt-[13px] pb-4 text-[12px] font-bold text-secondary-gray rounded-lg">
      <input type="checkbox" />
      <label>Research competitor pricing and business models</label>
    </section>
  );
}
