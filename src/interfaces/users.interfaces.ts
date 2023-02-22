import { QueryResult } from "pg";
import { allUserSchema } from "../schemas/users.schemas";
import { z } from "zod";

export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  admin: boolean;
}
export interface IUsers extends IUserRequest {
  id: number;
  active: boolean;
}

export type UserWithoutPassword = Omit<IUsers, "password">;
export type UserResult = QueryResult<UserWithoutPassword>;
export type UserResultPassword = QueryResult<IUsers>;
export type IAllUserReturn = z.infer<typeof allUserSchema>;
