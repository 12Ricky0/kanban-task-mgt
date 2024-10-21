import mongoose from "mongoose";
import { Board } from "@/libs/definitions";

const subTaskSchema = new mongoose.Schema({
  title: String,
  isCompleted: Boolean,
});

const taskSchema = new mongoose.Schema({
  title: String,
  describe: String,
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

const KanbanSchema =
  mongoose.models.KanbanSchema ||
  mongoose.model<Board>("KanbanTask", boardSchema);

export default KanbanSchema;
