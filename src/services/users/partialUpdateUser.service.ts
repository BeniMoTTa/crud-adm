import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database";
import { AppError } from "../../errors";
import {
  UserResult,
  UserWithoutPassword,
} from "../../interfaces/users.interfaces";
import { returnUserSchemaWithoutPassword } from "../../schemas/users.schemas";

export const partialUpdateService = async (
  id: number,
  dataUser: any
): Promise<UserWithoutPassword> => {
  const queryStringToAllUsers: string = `
    SELECT * FROM users WHERE email = $1
    `;
  const queryConfigAllUsers: QueryConfig = {
    text: queryStringToAllUsers,
    values: [dataUser.email],
  };
  const queryResultAllUsers: QueryResult = await client.query(
    queryConfigAllUsers
  );
  if (queryResultAllUsers.rowCount > 0) {
    throw new AppError("This User already exists in our Database", 409);
  }

  const queryString: string = format(
    `
    UPDATE users SET(%I) = ROW(%L) WHERE id = $1 RETURNING *;
  `,
    Object.keys(dataUser),
    Object.values(dataUser)
  );
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };
  const queryResult: UserResult = await client.query(queryConfig);
  const user = returnUserSchemaWithoutPassword.parse(queryResult.rows[0]);
  return user;
};
