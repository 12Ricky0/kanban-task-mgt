import mongoose from "mongoose";
import { Board } from "@/libs/definitions";

const subTaskSchema = new mongoose.Schema({
  title: String,
  isCompleted: Boolean,
});

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  subtasks: [subTaskSchema],
});

const columnSchema = new mongoose.Schema({
  name: String,
  tasks: [taskSchema],
});

const boardSchema = new mongoose.Schema<Board>({
  name: String,
  columns: [columnSchema],
});

const Kanban =
  mongoose.models.Kanban || mongoose.model<Board>("Kanban", boardSchema);

export default Kanban;
