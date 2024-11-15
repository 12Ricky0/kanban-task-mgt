import { z } from "zod";

export type User = {
  _id?: string;
  email: string;
  password: string;
};

export interface Subtask {
  title: string;
  isCompleted: boolean;
  _id?: string;
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
  _id?: string;
}

export interface Column {
  name: string;
  tasks: Tasks[];
  _id?: string;
}

export interface Board {
  _id: string;
  user: string;
  name: string;
  columns: Column[];
}

export const credentials = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must contain at least 6 character(s)" }),
});

export const subTask = z.object({
  title: z.string({}),
  isCompleted: z.boolean(),
});

export const tasks = z.object({
  title: z.string({}).min(1, { message: "Can`t be empty" }),
  description: z.string(),
  status: z.string().min(1, { message: "Select status" }),
  subtasks: z.array(subTask),
});

export const columns = z
  .object({
    name: z
      .string({
        required_error: "Column name is required",
      })
      .min(1, { message: "Can`t be empty" }),
    tasks: z.array(tasks),
  })
  .required();

export const board = z
  .object({
    user: z.string().email(),
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(1, { message: "Can`t be empty" }),
    columns: z.array(columns),
  })
  .required();
