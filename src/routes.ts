import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import validateResource from "./middleware/validateResource";
import { createUserSchema } from "./schema/user.schema";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler,
} from "./controller/session.controller";
import { createSessionSchema } from "./schema/session.schema";
import { requiredUser } from "./middleware/requiredUser";
import {
  createTodoSchema,
  deleteTodoSchema,
  getTodoSchema,
  updateTodoSchema,
} from "./schema/todo.schema";
import {
  createTodoHandler,
  deleteTodoHandler,
  getTodoHandler,
  updateTodoHandler,
} from "./controller/todo.controller";

const routes = (app: Express) => {
  app.get("/healthcheck", (_: Request, res: Response) => {
    res.sendStatus(200);
  });
  app.post("/api/users", validateResource(createUserSchema), createUserHandler);
  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );
  app.get("/api/sessions", requiredUser, getUserSessionsHandler);
  app.delete("/api/sessions", requiredUser, deleteSessionHandler);

  app.post(
    "/api/todos",
    [requiredUser, validateResource(createTodoSchema)],
    createTodoHandler
  );
  app.put(
    "/api/todos/:todoId",
    [requiredUser, validateResource(updateTodoSchema)],
    updateTodoHandler
  );
  app.get(
    "/api/todos/:todoId",
    [requiredUser, validateResource(getTodoSchema)],
    getTodoHandler
  );
  app.delete(
    "/api/todos/:todoId",
    [requiredUser, validateResource(deleteTodoSchema)],
    deleteTodoHandler
  );
};

export default routes;
