"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRepository = void 0;
const WriteRepository_1 = require("../BasicSkeleton/WriteRepository");
const Db_1 = require("../Db/Db");
const UserService_1 = require("./../User/UserService");
class ProjectRepository extends WriteRepository_1.WriteRepository {
    constructor() {
        super(Db_1.db);
        this.userServ = new UserService_1.UserService();
    }
    async GetAll(filter) {
        let query = `SELECT * FROM project`;
        const conditions = [];
        const params = [];
        if (filter?.name) {
            conditions.push(`u.name = $${params.length + 1}`);
            params.push(filter?.name);
        }
        if (conditions.length > 0) {
            query += " WHERE " + conditions.join(" AND ");
        }
        const res = await this.db.query(query, params);
        const projects = [];
        for (const data of res.rows) {
            const user = await this.userServ.GetById(data.user_id);
            const project = {
                Id: data.id,
                Name: data.name,
                CreatedAt: data.created_at,
                User: user
            };
            projects.push(project);
        }
        return projects;
    }
    async GetById(id) {
        const res = await this.db.query(`SELECT * FROM project p WHERE p.id = $1`, [id]);
        const user = await this.userServ.GetById(res.rows[0].user_id);
        const project = {
            Id: res.rows[0].id,
            Name: res.rows[0].name,
            CreatedAt: res.rows[0].created_at,
            User: user
        };
        return project;
    }
    async Create(data) {
        const res = await this.db.query(`INSERT INTO project (name, user_id) VALUES ($1, $2) RETURNING *`, [data.Name, data.User?.Id]);
        const user = await this.userServ.GetById(res.rows[0].user_id);
        const project = {
            Id: res.rows[0].id,
            Name: res.rows[0].name,
            CreatedAt: res.rows[0].created_at,
            User: user
        };
        return project;
    }
    async Update(id, data) {
        const res = await this.db.query(`UPDATE project 
           SET name = $1, created_at = $2, user_id = $3
           WHERE id = $4
           RETURNING *`, [data.Name, data.CreatedAt, data.User?.Id, id]);
        const user = await this.userServ.GetById(res.rows[0].user_id);
        const project = {
            Id: res.rows[0].id,
            Name: res.rows[0].name,
            CreatedAt: res.rows[0].created_at,
            User: user
        };
        return project;
    }
    async Delete(id) {
        await this.db.query(`DELETE FROM project WHERE id = $1`, [id]);
    }
}
exports.ProjectRepository = ProjectRepository;
