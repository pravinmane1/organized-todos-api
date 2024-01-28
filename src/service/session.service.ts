import { FilterQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../models/session.model";

export const createSession = async (userId: string, userAgent: string) => {
  const sesson = await SessionModel.create({ user: userId, userAgent });
  return sesson.toJSON();
};

export const findSessions = async (query: FilterQuery<SessionDocument>) => {
  return SessionModel.find(query).lean();//lean no methods, old plain object
};
