import { ProjectService } from "./ProjectService"
import { Result } from "./../Utils/Result"
import { Request } from "express";


export class ProjectController{

    private projectService = new ProjectService()

        async GetById(req: Request): Promise<Result> {
        const { id } = req.query;
        try {
            const service = this.projectService.GetById(Number(req.query.id));
            return {
                Success: true,
                Data: service,
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
    
    
}