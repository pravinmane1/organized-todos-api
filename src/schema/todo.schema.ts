import { TypeOf, boolean, object, string } from "zod";

const payload = {
  body: object({
    title: string({ required_error: "title is required" }),
    description: string({ required_error: "description is required" }).max(
      500,
      "description should be maximum 500 characters long"
    ),
    isCompleted: boolean({ required_error: "isCompleted is required" }),
  }),
};

const params = {
  params: object({
    todoId: string({ required_error: "todoId is required" }),
  }),
};

export const createTodoSchema = object({ ...payload });
export const updateTodoSchema = object({ ...payload, ...params });
export const deleteTodoSchema = object({ ...params });
export const getTodoSchema = object({ ...params });

export type createTodoInput  = TypeOf<typeof createTodoSchema>;
export type updateTodoInput  = TypeOf<typeof updateTodoSchema>;
export type deleteTodoInput  = TypeOf<typeof deleteTodoSchema>;
export type getTodoInput  = TypeOf<typeof getTodoSchema>;
