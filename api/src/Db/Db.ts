import { Pool } from "pg";

export const db = new Pool({
  host: "api-culteur-db",
  user: "postgres",
  password: "example",
  database: "db_api_culteur",
  port: 5432
});