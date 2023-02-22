import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

export const ensureUserAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const requestUser = req.user;
  if (requestUser.admin === false) {
    throw new AppError("Insufficient Permission");
  }
  return next();
};
