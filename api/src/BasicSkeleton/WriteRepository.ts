import { UUID } from "node:crypto";
import { db } from "../Db/Db";
import { Pool } from "pg";
import { ReadOnlyRepository } from './ReadOnlyRepository'

export abstract class WriteRepository<TI, TO> extends ReadOnlyRepository<TO> {

  abstract Create(data: TI): Promise<TO>;

  abstract Update(data: TI): Promise<TO>;

  abstract Delete(id: number): Promise<void>;
  
}

//TI est le Type input et TO est le Type Output