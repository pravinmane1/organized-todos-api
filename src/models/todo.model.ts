import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { customAlphabet } from "nanoid";

const nanoId = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface TodoInput {
  user: UserDocument["_id"];
  title: string;
  description: string;
  isCompleted: boolean;
}

export interface TodoDocument extends TodoInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const todoSchema = new mongoose.Schema(
  {
    todoId: {
      type: String,
      required: true,
      default: () => `todo_${nanoId()}`,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    isCompleted: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const TodoModel = mongoose.model<TodoDocument>("Todo", todoSchema);
export default TodoModel;
