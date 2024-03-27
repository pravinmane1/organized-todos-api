import { Request, Response } from "express";
import {
  createTodoInput,
  deleteTodoInput,
  getTodoInput,
  updateTodoInput,
} from "../schema/todo.schema";
import {
  createTodo,
  deleteTodo,
  findAndUpdateTodo,
  findTodo,
} from "../service/todo.service";

export const createTodoHandler = async (
  req: Request<{}, {}, createTodoInput["body"]>,
  res: Response
) => {
  const userId = res.locals.user._id;
  const body = req.body;
  const todo = await createTodo({ ...body, user: userId });
  res.send(todo);
};
export const updateTodoHandler = async (
  req: Request<updateTodoInput["params"]>,
  res: Response
) => {
  const userId = res.locals.user._id;
  const todoId = req.params.todoId;
  const update = req.body;
  const todo = await findTodo({ todoId });
  if (!todo) {
    return res.sendStatus(404);
  }

  if (String(todo.user) !== userId) {
    return res.sendStatus(403);
  }
  const updatedTodo = await findAndUpdateTodo({ todoId }, update, {
    new: true,
  });
  return res.send(updatedTodo);
};
export const getTodoHandler = async (
  req: Request<getTodoInput["params"]>,
  res: Response
) => {
  const userId = res.locals.user._id;
  const todoId = req.params.todoId;
  const todo = await findTodo({ todoId });
  if (!todo) {
    return res.sendStatus(404);
  }

  if (String(todo.user) !== userId) {
    return res.sendStatus(403);
  }
  return res.send(todo);
};
export const deleteTodoHandler = async (
  req: Request<deleteTodoInput["params"]>,
  res: Response
) => {
  const userId = res.locals.user._id;
  const todoId = req.params.todoId;
  const todo = await findTodo({ todoId });
  if (!todo) {
    return res.sendStatus(404);
  }

  if (String(todo.user) !== userId) {
    return res.sendStatus(403);
  }
  await deleteTodo({ todoId });
  return res.sendStatus(200);
};
