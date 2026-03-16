import { UUID } from "node:crypto";
import { db } from "../Db/Db";
import { Pool } from "pg";


export abstract class ReadOnlyRepository<T, F = any> {

  constructor(protected db: Pool) {}

  abstract GetAll(filter? : F): Promise<T[] | null>;

  abstract GetById(id: number | UUID): Promise<T | null>;

}
