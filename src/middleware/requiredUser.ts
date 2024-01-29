import { NextFunction, Request, Response } from "express";

export const requiredUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  console.log("user is ", user);
  if (!user) {
    return res.sendStatus(403);
  }

  return next();
};
