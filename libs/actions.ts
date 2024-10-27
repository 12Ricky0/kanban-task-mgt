"use server";
import { z } from "zod";
import Kanban from "@/models/kanbanData";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Board } from "./definitions";

const subArray = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  isCompleted: z.boolean(),
});

const tasks = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  description: z.string(),
  status: z.string(),
  subtasks: z.array(subArray),
});

const columns = z
  .object({
    name: z.string({
      required_error: "Column name is required",
    }),
    task: z.array(tasks),
  })
  .required();

const board = z
  .object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(1, { message: "Can`t be empty" }),
    columns: z.array(columns),
  })
  .required();

export async function createBoard(prevState: any, formData: FormData) {
  const columnNames = formData.getAll("column");

  const columnsData = columnNames.map((name) => ({
    name: name,
    task: [],
  }));

  const validateColumn = z.array(columns).safeParse(columnsData);

  const validateBoard = board.safeParse({
    name: formData.get("board-title"),
    columns: validateColumn.data,
  });

  if (!validateBoard.success) {
    return {
      errors: validateBoard.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Board.",
    };
  }

  try {
    await Kanban.create(validateBoard.data);
  } catch (error) {}
  revalidatePath("/");
  redirect("/");
}

export async function deleteBoard(id: string) {
  try {
    await Kanban.findByIdAndDelete(id);
    // console.log(id);
  } catch (error) {}
  revalidatePath("/");
  redirect("/");
}
