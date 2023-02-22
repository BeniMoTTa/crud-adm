import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";

export const updateUserService = async (id: number): Promise<void> => {
  const queryString: string = `
    UPDATE users
    SET active = true
    WHERE id = $1
    RETURNING "id", "name", "admin", "active";
    `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };
  const queryResult: QueryResult = await client.query(queryConfig);

  return queryResult.rows[0];
};
