import { z } from "zod";

export interface Subtask {
  title: string;
  isCompleted: boolean;
}

export interface Task {
  title: string;
  subtasks: Subtask[];
}
export interface Tasks {
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
}

export interface Column {
  name: string;
  tasks: Tasks[];
}

export interface Board {
  _id: string;
  name: string;
  columns: Column[];
}

export const subArray = z.object({
  title: z.string({}),
  isCompleted: z.boolean(),
});

export const tasks = z.object({
  title: z.string({}),
  description: z.string(),
  status: z.string(),
  subtasks: z.array(subArray),
});

export const columns = z
  .object({
    name: z.string({
      required_error: "Column name is required",
    }),
    tasks: z.array(tasks),
  })
  .required();

export const board = z
  .object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(1, { message: "Can`t be empty" }),
    columns: z.array(columns),
  })
  .required();
