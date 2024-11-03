"use server";
import { z } from "zod";
import Kanban from "@/models/kanbanData";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { columns, board, subTask, tasks, Column } from "./definitions";

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

export async function createTask(
  id: string,
  prevState: any,
  formData: FormData
) {
  const subtasks = formData.getAll("subtask");
  const status = formData.get("status");

  const subtask = subtasks.map((name) => ({
    title: name,
    isCompleted: false,
  }));

  const validateSubtask = z.array(subTask).safeParse(subtask);

  const validateTask = tasks.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    status: status,
    subtasks: validateSubtask.data,
  });

  if (!validateTask.success) {
    return {
      errors: validateTask.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Board.",
    };
  }

  try {
    const doc = await Kanban.findById(id);

    const res = doc.columns.find((c: Column) => c.name === status);
    res.tasks.push(validateTask.data);
    await doc.save();
  } catch (error) {}
  revalidatePath("/");
  redirect("/");
}

export async function updateTask(
  id: string,
  prevState: any,
  formData: FormData
) {
  const subtasks = formData.getAll("subtask");
  const completed = formData.getAll("completed");
  const status = formData.get("status");
  const column_id = formData.get("column-id");

  const subtask = subtasks.map((name, index) => ({
    title: name,
    isCompleted: completed[index] === "true",
  }));

  const validateSubtask = z.array(subTask).safeParse(subtask);

  const validateTask = tasks.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    status: status,
    subtasks: validateSubtask.data,
  });

  if (!validateTask.success) {
    return {
      errors: validateTask.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Board.",
    };
  }

  try {
    const doc = await Kanban.findById(id);

    let res = doc.columns.find((c: Column) => c._id!.toString() === column_id);
    const { title, description, status: s, subtasks } = validateTask.data;

    const toEdit = res.tasks[0];
    toEdit.title = title;
    toEdit.description = description;
    toEdit.status = s;
    toEdit.subtasks = subtasks;
    await doc.save();
  } catch (error) {}
  revalidatePath("/");
  redirect("/");
}

export async function deleteTask(id: string, column_id: string, title: string) {
  try {
    await Kanban.updateOne(
      { _id: id, "columns._id": column_id },
      { $pull: { "columns.$.tasks": { title: title } } }
    );
  } catch (error) {}
  revalidatePath("/");
  redirect("/");
}
