"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const ReadOnlyRepository_1 = require("../BasicSkeleton/ReadOnlyRepository");
const Db_1 = require("../Db/Db");
class UserRepository extends ReadOnlyRepository_1.ReadOnlyRepository {
    constructor() {
        super(Db_1.db);
    }
    async GetAll(filter) {
        let query = `
          SELECT u.id, u.username, u.password, u.name, r.libelle AS role 
          FROM users u
          INNER JOIN Role r ON u.role_id = r.id
          `;
        const conditions = [];
        const params = [];
        if (filter?.name) {
            conditions.push(`u.name = $${params.length + 1}`);
            params.push(filter?.name);
        }
        if (filter?.username) {
            conditions.push(`u.username = $${params.length + 1}`);
            params.push(filter?.username);
        }
        if (filter?.role) {
            conditions.push(`r.libelle = $${params.length + 1}`);
            params.push(filter?.role);
        }
        if (conditions.length > 0) {
            query += " WHERE " + conditions.join(" AND ");
        }
        const res = await this.db.query(query, params);
        const users = res.rows.map(data => ({
            Id: data.id,
            Username: data.username,
            Password: data.password,
            Name: data.name,
            Role: data.role
        }));
        return users;
    }
    async GetById(id) {
        const res = await this.db.query(`
            SELECT u.id, u.username, u.password, u.name, r.libelle AS role
            FROM users u
            INNER JOIN Role r ON u.role_id = r.id
            WHERE u.id = $1
        `, [id]);
        if (res.rows.length === 0)
            return null;
        const data = res.rows[0];
        const user = {
            Id: data.id,
            Username: data.username,
            Password: data.password,
            Name: data.name,
            Role: data.role
        };
        return user;
    }
}
exports.UserRepository = UserRepository;
