import { client } from "./config";

export const startDataBase = async (): Promise<void> => {
  await client.connect();
  console.log("Database connected!");
};
