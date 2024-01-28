import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import { createSession, findSessions } from "../service/session.service";
import { signJwt } from "../utils/jwt.utils";
import config from "config";

export const createUserSessionHandler = async (req: Request, res: Response) => {
  //validate user password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }
  //create session
  const session = await createSession(user._id, req.get("user-agent") || "");
  //create access token
  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get<string>("accessTokenTtl") } //15minutes
  );
  //create refresh token
  const refreshToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get<string>("accessTokenTtl") } //15minutes
  );
  // return access & refresh tokens
  return res.send({ accessToken, refreshToken });
};

export const getUserSessionsHandler = async (req: Request, res: Response) => {
  console.log("user ", res.locals.user);
  const userId = res.locals.user._id;
  const sessions = await findSessions({ user: userId, valid: true });
  return res.send(sessions);
};
