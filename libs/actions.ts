"use server";
import { z } from "zod";
import Kanban from "@/models/kanbanData";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Board } from "./definitions";
import { columns, board } from "./definitions";

export async function createBoard(prevState: any, formData: FormData) {
  const columnNames = formData.getAll("column");

  const columnsData = columnNames.map((name) => ({
    name: name,
    tasks: [],
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

export async function updateBoard(
  id: string,
  prevState: any,
  formData: FormData
) {
  const columnNames = formData?.getAll("column") as string[];
  const rawFormData = Object.fromEntries(formData.entries());

  const columnsData = columnNames.map((name) => ({
    name: name,
    tasks: JSON.parse((rawFormData[name] as string) || "[]"),
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
    await Kanban.findByIdAndUpdate({ _id: id }, validateBoard.data, {});
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
