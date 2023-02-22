import {
  IAllUserReturn,
  UserResult,
  UserWithoutPassword,
} from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { QueryConfig } from "pg";

export const profileUserLister = async (
  id: string
): Promise<UserWithoutPassword> => {
  const queryString: string = `
  SELECT
     id, "name", "email", "admin", "active"
  FROM users u WHERE id = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: UserResult = await client.query(queryConfig);

  return queryResult.rows[0];
};
