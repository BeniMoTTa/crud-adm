import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

export const ensureLoggedUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const tokenId: string = req.user.id;
  const userId: number = +req.params.id;

  if (+tokenId !== userId) {
    throw new AppError("Insufficient Permission", 403);
  }
  return next();
};
