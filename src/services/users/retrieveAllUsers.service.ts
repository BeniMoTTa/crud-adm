import { IAllUserReturn } from "../../interfaces/users.interfaces";
import { client } from "../../database";

export const listUserService = async (): Promise<IAllUserReturn> => {
  const queryString: string = `
  SELECT
     id, "name", "email", "admin", "active"
  FROM
    users u
    `;

  const queryResult = await client.query(queryString);

  return queryResult.rows;
};
