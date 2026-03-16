import { Pool } from "pg";

export const db = new Pool({
  host: "localhost",
  user: "apiculteur",
  password: "nous-aimons-les-abeilles",
  database: "api-culteur",
  port: 5432,
});