import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import jwt from "jsonwebtoken";

export const ensureTokenIsValid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token = req.headers.authorization;

  if (!token) {
    throw new AppError("Token is missing", 401);
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEYS!, (error, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }

    req.user = {
      id: decoded.sub,
      admin: decoded.admin,
    };

    return next();
  });
};
