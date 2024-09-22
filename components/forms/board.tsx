// "use client";
// import { Overlay } from "../overlay";
// import { useState } from "react";
// import SubtaskForm from "./subtask";
// export default function BoardForm() {
//   const [columns, setColumns] = useState<JSX.Element[]>([]);

//   function handleDelete(key: number) {
//     setColumns((prev) => {
//       return prev.filter((_, i) => i !== key);
//     });
//   }

//   function handleAdd(event: React.FormEvent) {
//     event.preventDefault();
//     setColumns([
//       ...columns,
//       <SubtaskForm
//         key={columns.length}
//         index={columns.length}
//         onDelete={handleDelete}
//       />,
//     ]);
//   }

//   return (
//     <Overlay>
//       <section className="bg-white mx-4 w-full md:w-[480px] rounded-lg z-10">
//         <h1 className="mx-6 font-bold text-[18px] text-primary-dark py-6">
//           Add New Board
//         </h1>

//         <form action="" className="mx-6">
//           <div className="flex flex-col">
//             <label
//               className="mb-2 text-[13px] text-secondary-gray font-bold"
//               htmlFor="title"
//             >
//               Name
//             </label>
//             <input
//               type="text"
//               id="title"
//               name="title"
//               placeholder="e.g. Web Design"
//               className="w-full border border-secondary-gray border-opacity-25 rounded-lg font-medium text-[13px] pl-4 py-2"
//             />
//           </div>

//           <div className="mt-6">
//             <h1 className="mb-2 text-[13px] text-secondary-gray font-bold">
//               Columns
//             </h1>
//             {columns}
//             <button
//               className=" text-primary-violet hover:bg-secondary-light-blue h-10 font-bold text-[13px] bg-tetiary-white-space w-[100%] rounded-full"
//               onClick={handleAdd}
//             >
//               +Add New Column
//             </button>
//           </div>
//           <button className="block mb-4 text-white hover:bg-primary-light-violet h-10 font-bold text-[13px] bg-primary-violet w-[100%] rounded-full">
//             Create New Board
//           </button>
//         </form>
//       </section>
//     </Overlay>
//   );
// }
