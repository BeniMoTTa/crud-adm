import { Client } from "pg";
import "dotenv/config";

export const client: Client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  database: process.env.DB_DATABASE,
});
