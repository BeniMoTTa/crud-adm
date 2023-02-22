import { Router } from "express";
import {
  createUsersController,
  deleteUserController,
  retrieveUserController,
  retrieveAllUserController,
  recoverUserController,
  profileListenController,
  partialUpdateController,
} from "../controllers/users.controllers";
import { ensureUserExistsMiddleware } from "../middlewares/userExists.middleware";
import { ensureDataIsValidMiddleware } from "../middlewares/dataIsValid.middleware";
import {
  createUserSchema,
  allUserSchema,
  updateUserSchema,
} from "../schemas/users.schemas";
import { hash } from "bcryptjs";
import { ensureTokenIsValid } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureUserAdmin } from "../middlewares/isAdmin.middleware";
import { ensureLoggedUserMiddleware } from "../middlewares/loggedUser.middleware";

export const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddleware(createUserSchema),
  createUsersController
);

userRoutes.get(
  "",
  ensureTokenIsValid,
  ensureUserAdmin,
  retrieveAllUserController
);
// userRoutes.get(
//   "/:id",
//   ensureTokenIsValid,
//   ensureUserExistsMiddleware,
//   retrieveUserController
// );
userRoutes.put(
  "/:id/recover",
  ensureTokenIsValid,
  ensureUserExistsMiddleware,
  recoverUserController
);

userRoutes.delete(
  "/:id",
  ensureTokenIsValid,
  ensureUserExistsMiddleware,
  deleteUserController
);

userRoutes.get("/profile", ensureTokenIsValid, profileListenController);
userRoutes.patch(
  "/:id",
  ensureUserExistsMiddleware,
  ensureTokenIsValid,
  ensureDataIsValidMiddleware(updateUserSchema),
  partialUpdateController
);
