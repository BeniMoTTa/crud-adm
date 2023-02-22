import { QueryConfig } from "pg";
import {
  UserResult,
  IUsers,
  UserWithoutPassword,
} from "../../interfaces/users.interfaces";
import { client } from "../../database";

export const retrieveUserService = async (
  userId: number
): Promise<UserWithoutPassword> => {
  const queryString: string = `
        SELECT
            *
        FROM
            users
        WHERE
            id = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult: UserResult = await client.query(queryConfig);

  return queryResult.rows[0];
};
