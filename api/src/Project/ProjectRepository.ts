import { WriteRepository } from "../BasicSkeleton/WriteRepository";
import { Project } from "./ProjectModel";
import { ProjectDAO } from "./ProjectDAO";
import { db } from "../Db/Db";
import { UserService } from "./../User/UserService";
import { User } from './../User/UserModel'
import { ProjectFilter } from "./ProjectFilter";

export class ProjectRepository extends WriteRepository<ProjectDAO,Project>{

      constructor() {
        super(db);
      }

      private userServ = new UserService();
    
      async GetAll(filter?: ProjectFilter): Promise<Project[]>{

        let query = `SELECT * FROM projects`
        
        const conditions = [];
        const params = [];

        if (filter?.name) {
          conditions.push(`u.name = $${params.length + 1}`);
          params.push(filter?.name);
        }

        if (conditions.length > 0) {
          query += " WHERE " + conditions.join(" AND ");
        }

        const res = await this.db.query(query, params)
        const projects: Project[] = []

        for(const data of res.rows){


          const user: User | undefined = await this.userServ.GetById(data.user_id)

          const project : Project = {
            Id: data.id,
            Name: data.name,
            CreatedAt: data.created_at,
            User: user
          }

          projects.push(project)

        }
        return projects
      }
    
      async GetById(id: number): Promise<Project | null>{
        const res = await this.db.query(`SELECT * FROM projects p WHERE p.id = $1`, [id])
        
        const user: User | undefined = await this.userServ.GetById(res.rows[0].user_id)

        const project : Project = {
          Id: res.rows[0].id,
          Name: res.rows[0].name,
          CreatedAt: res.rows[0].created_at,
          User: user
        }       

        return project
      }
    
      async Create(data: ProjectDAO): Promise<Project>{

        const res = await this.db.query(`INSERT INTO projects (name, user_id) VALUES ($1, $2) RETURNING *`, [data.name, data.userId])
        
        const user: User | undefined = await this.userServ.GetById(res.rows[0].user_id)
        
        const project: Project = {
          Id: res.rows[0].id,
          Name: res.rows[0].name,
          CreatedAt: res.rows[0].created_at,
          User: user
        }
        return project
      }
    
      async Update(data: ProjectDAO): Promise<Project>{
        const res = await this.db.query(
            `UPDATE projects 
             SET name = $1, created_at = $2, user_id = $3
             WHERE id = $4
             RETURNING *`,
            [data.name, data.createdAt, data.userId, data.id]
        );

        const user = await this.userServ.GetById(res.rows[0].user_id);

        const project: Project =  {
            Id: res.rows[0].id,
            Name: res.rows[0].name,
            CreatedAt: res.rows[0].created_at,
            User: user
        }
        return project
      }

    
      async Delete(id: number): Promise<void>{
        await this.db.query(`DELETE FROM projects WHERE id = $1`,[id])
      }

}