import { ReadOnlyRepository } from "../BasicSkeleton/ReadOnlyRepository";
import { User } from "./UserModel";
import { db } from "../Db/Db";
import { UserFilter } from "./UserFilter";

export class UserRepository extends ReadOnlyRepository<User>{

      constructor() {
        super(db);
      }
    
      async GetAll(filter? : UserFilter): Promise<User[]>{

        let query = `
          SELECT u.id, u.username, u.password, u.name, r.libelle AS role 
          FROM users
          INNER JOIN Role r ON u.role_id = r.id
          `

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

        

        const users: User[] = res.rows.map(data => ({
            Id: data.id,
            Username: data.username,
            Password: data.password,
            Name: data.name,
            Role: data.role
        }));

        return users
      }
    
    async GetById(id: number): Promise<User | null> {
        const res = await this.db.query(`
            SELECT u.id, u.username, u.password, u.name, r.libelle AS role
            FROM users u
            INNER JOIN Role r ON u.role_id = r.id
            WHERE u.id = $1
        `, [id]);

        if (res.rows.length === 0) return null;

        const data = res.rows[0];
        const user: User = {
            Id: data.id,
            Username: data.username,
            Password: data.password,
            Name: data.name,
            Role: data.role
        };

        return user;
    }

}