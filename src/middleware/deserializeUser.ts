import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../utils/jwt.utils";
import { get } from "lodash";
import { reIssueAccessToken } from "../service/session.service";

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );
  const refreshToken = (req.headers?.["x-refresh"] as string)?.replace(
    /^Bearer\s/,
    ""
  );

  if (!accessToken) {
    return next();
  }

  const { decoded, expired } = verifyJwt(accessToken);
  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    console.log("found refresh and access expired");
    const { newDecoded, newAccessToken } = await reIssueAccessToken(
      refreshToken
    );
    console.log(newAccessToken, "new token");

    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);
      res.locals.user = newDecoded;
      return next();
    }
  }

  return next();
};
