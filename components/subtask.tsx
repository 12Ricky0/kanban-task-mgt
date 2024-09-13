export default function Subtask() {
  return (
    <div className="absolute bg-white w-[192px] right-5 md:right-0 rounded-lg shadow-lg justify-end mt-5 py-4">
      <button className="block ml-4 mb-4 text-[13px] font-medium text-secondary-gray">
        Edit Board
      </button>
      <button className="ml-4 text-[13px] font-medium text-tetiary-red">
        Delete Board
      </button>
    </div>
  );
}