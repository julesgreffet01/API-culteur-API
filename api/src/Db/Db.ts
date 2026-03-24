import { Pool } from "pg";

export const db = new Pool({
  host: "localhost",
  user: "postgres",
  password: "example",
  database: "db_api-culteur",
  port: 5433,
});