import { ProjectService } from "./ProjectService"
import { ProjectFilter } from "./ProjectFilter";
import { Result } from "./../Utils/Result"
import { Request } from "express";


export class ProjectController{

    private projectService = new ProjectService()

    async Create(req: Request): Promise<Result> {
        const { name } = req.query;
        try {
            const project = this.projectService.Create(name as string);
            return {
                Success: true,
                Data: project,
                Message: "Création du projet réussi"
            }
        } catch (err) {
            return {
                Success: false,
                Data: null,
                ErrorCode: (err as Error).name,
                Message: (err as Error).message
            };
        }
    }

    async GetById(req: Request): Promise<Result> {
        const { id } = req.query;
        try {
            const project = this.projectService.GetById(Number(id));
            return {
                Success: true,
                Data: project,
                Message: "Resultat du projet"
            }
        } catch (err) {
            return {
                Success: false,
                Data: null,
                ErrorCode: (err as Error).name,
                Message: (err as Error).message
            };
        }
    }


    async GetAll(req: Request): Promise<Result> {
        const { name } = req.query;
        const filter : ProjectFilter = {
            name: req.query.name as string
        }
        try {
            const projects = this.projectService.GetAll(filter);
            return {
                Success: true,
                Data: projects,
                Message: "Total des projets"
            }
        } catch (err) {
            return {
                Success: false,
                Data: null,
                ErrorCode: (err as Error).name,
                Message: (err as Error).message
            };
        }
    }
    
    
}