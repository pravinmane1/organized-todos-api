import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../models/session.model";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import { getUser } from "./user.service";
import config from "config";

export const createSession = async (userId: string, userAgent: string) => {
  const sesson = await SessionModel.create({ user: userId, userAgent });
  return sesson.toJSON();
};

export const findSessions = async (query: FilterQuery<SessionDocument>) => {
  return SessionModel.find(query).lean(); //lean gives json old plain object, without any methods
};

export const updateSession = async (
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) => {
  return SessionModel.updateOne(query, update);
};

export const reIssueAccessToken = async (refreshToken: string) => {
  const { expired, decoded } = verifyJwt(refreshToken);
  if (expired || !decoded) {
    return {};
  }
  const session = await SessionModel.findById(decoded?.session);

  if (!session?.valid) {
    return {};
  }

  const user = await getUser({ _id: decoded._id });
  if (!user) {
    return {};
  }

  const newDecoded = { ...user, session: session._id };
  console.log("new decoded is ", newDecoded);
  const newAccessToken = signJwt(
    newDecoded,
    { expiresIn: config.get<string>("accessTokenTtl") } //15minutes
  );

  return { newDecoded, newAccessToken };
};
