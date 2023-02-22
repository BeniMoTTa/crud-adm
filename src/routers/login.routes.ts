import { Router } from "express";
import { createLoginController } from "../controllers/login.controller";
import { ensureDataIsValidMiddleware } from "../middlewares/dataIsValid.middleware";
import { createLoginSchema } from "../schemas/login.schemas";

export const loginRoutes: Router = Router();

loginRoutes.post(
  "",
  ensureDataIsValidMiddleware(createLoginSchema),
  createLoginController
);
