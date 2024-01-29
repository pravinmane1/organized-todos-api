import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import validateResource from "./middleware/validateResource";
import { createUserSchema } from "./schema/user.schema";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
} from "./controller/session.controller";
import { createSessionSchema } from "./schema/session.schema";
import { requiredUser } from "./middleware/requiredUser";

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
};

export default routes;
