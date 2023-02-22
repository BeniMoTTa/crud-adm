import { Response, Request } from "express";
import {
  IUserRequest,
  UserResult,
  UserWithoutPassword,
} from "../interfaces/users.interfaces";
import { createUsersService } from "../services/users/createUsers.service";
import { retrieveUserService } from "../services/users/retrieveUser.service";
import { deleteUserService } from "../services/users/deleteUser.service";
import { listUserService } from "..//services/users/retrieveAllUsers.service";
import { updateUserService } from "../services/users/updateUser.service";
import { profileUserLister } from "../services/users/profile.list.service";
import { partialUpdateService } from "../services/users/partialUpdateUser.service";

export const createUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: IUserRequest = req.body;

  const newUser = await createUsersService(userData);

  return res.status(201).json(newUser);
};

export const retrieveUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = +req.params.id;

  const user = await retrieveUserService(userId);

  return res.json(user);
};

export const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = +req.params.id;

  await deleteUserService(userId);
  return res.status(204).send();
};
export const retrieveAllUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await listUserService();

  return res.status(200).json(users);
};
export const recoverUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const paramId: number = +req.params.id;
  const adminResource = await updateUserService(paramId);
  return res.status(201).json(adminResource);
};

export const profileListenController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const tokenId: string = req.user.id;

  const resultUser = await profileUserLister(tokenId);

  return res.status(200).json(resultUser);
};

export const partialUpdateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const paramId: number = +req.params.id;
  const dataUser: IUserRequest = req.body;
  const partialUpdate = await partialUpdateService(paramId, dataUser);

  return res.json(partialUpdate);
};
