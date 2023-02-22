import { ILoginRequest } from "../../interfaces/login.interface";
import { client } from "../../database/index";
import { QueryConfig } from "pg";
import { AppError } from "../../errors";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  UserResult,
  UserResultPassword,
} from "../../interfaces/users.interfaces";

export const createLoginService = async (
  loginData: ILoginRequest
): Promise<string> => {
  const queryString: string = `
    SELECT
        *
    FROM
        users
    WHERE
        email= $1;
    `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [loginData.email],
  };
  const queryResult: UserResultPassword = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    throw new AppError("Wrong email of password", 401);
  }
  const matchPassword: boolean = await compare(
    loginData.password,
    queryResult.rows[0].password
  );
  if (!matchPassword) {
    throw new AppError("Wrong email of password", 401);
  }
  const token: string = jwt.sign(
    {
      admin: queryResult.rows[0].admin,
    },
    process.env.SECRET_KEYS!,
    {
      expiresIn: "15m",
      subject: queryResult.rows[0].id.toString(),
    }
  );

  return token;
};
