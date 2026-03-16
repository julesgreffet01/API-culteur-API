import { UUID } from "node:crypto";
import { db } from "../Db/Db";
import { Pool } from "pg";
import { ReadOnlyRepository } from './ReadOnlyRepository'

export abstract class WriteRepository<T> extends ReadOnlyRepository<T> {

  abstract Create(data: T): Promise<T>;

  abstract Update(id: number, data: T): Promise<T>;

  abstract Delete(id: number): Promise<void>;
  
}