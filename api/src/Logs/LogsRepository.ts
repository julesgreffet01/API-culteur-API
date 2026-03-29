import {db} from "../Db/Db";
import type {Pool} from "pg";
export class LogsRepository{
    private readonly db: Pool;
    constructor() {
        this.db = db
    }

    async insertIn(ip: string, userId?: number ): Promise<void> {
        const query = `INSERT INTO logs (ip, user_id) VALUES ($1, $2)`;
        await this.db.query(query, [ip, userId ?? null]);
    }
}