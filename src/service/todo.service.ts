import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import TodoModel, { TodoDocument, TodoInput } from "../models/todo.model";

export const createTodo = async (input: TodoInput) => {
  return TodoModel.create(input);
};

export const findTodo = async (
  query: FilterQuery<TodoDocument>,
  options: QueryOptions = { lean: true }
) => {
  return TodoModel.findOne(query, {}, options);
};

export const findAndUpdateTodo = async (
  query: FilterQuery<TodoDocument>,
  update: UpdateQuery<TodoDocument>,
  options: QueryOptions
) => {
  return TodoModel.findOneAndUpdate(query, update, options);
};
export const deleteTodo = async (query: FilterQuery<TodoDocument>) => {
  return TodoModel.deleteOne(query);
};
