import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

export const ensureDataIsValidMiddleware =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    const validatedData = schema.parse(req.body);

    req.body = validatedData;

    return next();
  };
