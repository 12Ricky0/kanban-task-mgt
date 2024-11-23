"use server";
import { z } from "zod";
import Kanban from "@/models/kanbanData";
import KanbanUser from "@/models/kanbanUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { dbConnect } from "./dbConnect";
import bcryptjs from "bcryptjs";
import { auth } from "@/auth";
import {
  columns,
  board,
  subTask,
  tasks,
  credentials,
  Column,
  Tasks,
} from "./definitions";
import { notFound } from "next/navigation";

export async function registerUser(prevState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const repeat = formData.get("repeat_password");

  const validateCredentials = credentials.safeParse({
    email: email,
    password: password,
  });

  const user = await getUser(email!.toString());
  if (user) {
    return { message: "Email already in use" };
  }
  if (password !== repeat) {
    return { message: "Password do not match" };
  }
  if (!validateCredentials.success) {
    return {
      errors: validateCredentials.error.flatten().fieldErrors,
    };
  }

  try {
    var salt = bcryptjs.genSaltSync(10);

    const { email, password } = validateCredentials.data;
    const hashedPassword = await bcryptjs.hash(password, salt);
    const data = { email: email, password: hashedPassword };
    await dbConnect();

    await KanbanUser.create(data);

    const userData = {
      user: email,
      name: "Welcome",
      columns: [],
    };
    await Kanban.create(userData);
  } catch (error) {
    throw new Error(notFound());
  }
  redirect("/login");
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
  redirect("/");
}
export async function getUser(email: string) {
  await dbConnect();

  return await KanbanUser.findOne({ email: email });
}

export async function createBoard(prevState: any, formData: FormData) {
  const columnNames = formData.getAll("column");
  const session = await auth();

  const columnsData = columnNames.map((name) => ({
    name: name,
    tasks: [],
  }));

  const validateColumn = z.array(columns).safeParse(columnsData);

  const validateBoard = board.safeParse({
    user: session?.user?.email,
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
  } catch (error) {
    console.log(error);
    throw new Error(notFound());
  }
  revalidatePath("/");
  redirect("/");
}

export async function updateBoard(
  id: string,
  prevState: any,
  formData: FormData
) {
  const session = await auth();

  const columnNames = formData?.getAll("column") as string[];
  const rawFormData = Object.fromEntries(formData.entries());

  const columnsData = columnNames.map((name) => ({
    name: name,
    tasks: JSON.parse((rawFormData[name] as string) || "[]"),
  }));

  const validateColumn = z.array(columns).safeParse(columnsData);

  const validateBoard = board.safeParse({
    user: session?.user?.email,
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
  } catch (error) {
    throw new Error(notFound());
  }

  revalidatePath("/");
  redirect("/");
}

export async function deleteBoard(id: string) {
  try {
    await Kanban.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(notFound());
  }
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
  } catch (error) {
    throw new Error(notFound());
  }
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
  } catch (error) {
    console.error(error);
    throw new Error(notFound());
  }
  revalidatePath("/");
  redirect("/");
}

export async function updatedIsCompleted(
  id: string,
  column_id: string,
  task_id: string,
  title_id: string,
  status: boolean
) {
  const doc = await Kanban.findById(id);
  let col = doc.columns.find((c: Column) => c._id!.toString() === column_id);
  let title = col.tasks.find((task: Tasks) => task._id!.toString() === task_id);
  try {
    await Kanban.updateOne(
      {
        _id: id,
        "columns._id": column_id,
        "columns.tasks._id": task_id,
        "columns.tasks.subtasks._id": title_id,
      },
      {
        $set: {
          "columns.$[col].tasks.$[task].subtasks.$[subtask].isCompleted":
            !status,
        },
      },
      {
        arrayFilters: [
          { "col._id": column_id },
          { "task._id": task_id },
          { "subtask._id": title_id },
        ],
      }
    );
  } catch (error) {
    console.error(error);
    throw new Error(notFound());
  }
  revalidatePath(
    "/details/" + id + "/" + encodeURI(col.name) + "/" + encodeURI(title.title)
  );
}

export async function deleteTask(id: string, column_id: string, title: string) {
  try {
    await Kanban.updateOne(
      { _id: id, "columns._id": column_id },
      { $pull: { "columns.$.tasks": { title: title } } }
    );
  } catch (error) {
    console.error(error);
    throw new Error(notFound());
  }
  revalidatePath("/");
  redirect("/");
}

export async function updateDnD(
  id: string,
  active: string,
  title: string | number,
  over: string
) {
  try {
    const doc = await Kanban.findById(id);

    const activeColumn = doc.columns.find(
      (column: Column) => column.name === active
    );
    const destColumn = doc.columns.find(
      (column: Column) => column.name === over
    );

    const taskIndex = activeColumn.tasks.findIndex(
      (task: Tasks) => task.title === title
    );

    const [task] = activeColumn.tasks.splice(taskIndex, 1);
    task.status = destColumn.name;
    destColumn.tasks.push(task);

    await doc.save();
  } catch (error) {
    console.error(error);
    throw new Error(notFound());
  }
  revalidatePath("/");
}

export async function sortTask(
  id: string,
  active: string,
  oldIndex: number,
  newIndex: number
) {
  try {
    const doc = await Kanban.findById(id);
    const activeColumn = doc.columns.find(
      (column: Column) => column.name === active
    );

    const [task] = activeColumn.tasks.splice(oldIndex, 1);
    activeColumn.tasks.splice(newIndex, 0, task);

    await doc.save();
  } catch (error) {
    throw new Error(notFound());
  }
  revalidatePath("/");
}
