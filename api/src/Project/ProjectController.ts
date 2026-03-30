import { ProjectService } from "./ProjectService"
import { ProjectFilter } from "./ProjectFilter";
import { ProjectDAO } from "./ProjectDAO";
import { Request, Response } from "express";


export class ProjectController{

    private projectService = new ProjectService()

    async Create(req: Request, res: Response){
        const { name, userId } = req.body;
        const projectdao: ProjectDAO = {
            id: 0,
            name: name as string,
            createdAt: new Date().toISOString(),
            userId: userId,
        }
        try {
            const project = await this.projectService.Create(projectdao);
            res.json({
                Success: true,
                Data: project,
                Message: "Création du projet réussi"
            })
        } catch (err) {
            res.status(500).json({
                Success: false,
                Data: null,
                ErrorCode: (err as Error).name,
                Message: (err as Error).message
            })
        }
    }
    
    
    async Update(req: Request, res: Response){
        
        const id = req.params.id;

        const { name, userId } = req.body;
        const projectdao: ProjectDAO = {
            id: Number(id),
            name: name as string,
            createdAt: new Date().toISOString(),
            userId: userId
        }
        try {
            const project = await this.projectService.Update(projectdao);
            res.json({
                Success: true,
                Data: project,
                Message: "Modification du projet réussi"
            })
        } catch (err) {
            res.status(500).json({
                Success: false,
                Data: null,
                ErrorCode: (err as Error).name,
                Message: (err as Error).message
            })
        }
    }

    async Delete(req: Request, res: Response){
        const { id } = req.params;
        try {
            const project = await this.projectService.Delete(Number(id));
            res.json({
                Success: true,
                Data: project,
                Message: "Projet Supprimé"
            })
        } catch (err) {
            res.status(500).json({
                Success: false,
                Data: null,
                ErrorCode: (err as Error).name,
                Message: (err as Error).message
            })
        }
    }

    async GetById(req: Request, res: Response){
        const { id } = req.params;
        try {
            const project = await this.projectService.GetById(Number(id));
            res.json({
                Success: true,
                Data: project,
                Message: "Resultat du projet"
            })
        } catch (err) {
            res.status(500).json({
                Success: false,
                Data: null,
                ErrorCode: (err as Error).name,
                Message: (err as Error).message
            })
        }
    }


    async GetAll(req: Request, res: Response){
        const { name } = req.query;
        const filter : ProjectFilter = {
            name: name as string
        }
        try {
            const projects = await this.projectService.GetAll(filter);
            res.json({
                Success: true,
                Data: projects,
                Message: "Total des projets"
            })
        } catch (err) {
            res.status(500).json({
                Success: false,
                Data: null,
                ErrorCode: (err as Error).name,
                Message: (err as Error).message
            })
        }
    }
    
    
}