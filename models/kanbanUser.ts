import mongoose from "mongoose";
import { User } from "@/libs/definitions";

const userSchema = new mongoose.Schema<User>({
  email: String,
  password: String,
});

const KanbanUser =
  mongoose.models.KanbanUser || mongoose.model<User>("KanbanUser", userSchema);

export default KanbanUser;
