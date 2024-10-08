import { Overlay } from "../overlay";

export default function DeleteModal() {
  return (
    <Overlay>
      <section className="bg-white z-10 mx-4 md:w-[480px] rounded-lg pb-6">
        <article className="mx-6 md:mx-8">
          <h1 className="text-[18px] my-6 font-bold text-tetiary-red">
            Delete this board?
          </h1>
          <p className="text-[13px] text-secondary-gray mb-6">
            Are you sure you want to delete the ‘Platform Launch’ board? This
            action will remove all columns and tasks and cannot be reversed.
          </p>

          <div className="md:flex gap-4">
            <button className="block mb-4 text-white hover:bg-tetiary-light-red leading-[23p] h-10 font-bold text-[13px] bg-tetiary-red w-[100%] rounded-full">
              Delete
            </button>
            <button className=" text-primary-violet hover:bg-secondary-light-blue leading-[23p] h-10 font-bold text-[13px] bg-tetiary-white-space w-[100%] rounded-full">
              Cancel
            </button>
          </div>
        </article>
      </section>
    </Overlay>
  );
}
