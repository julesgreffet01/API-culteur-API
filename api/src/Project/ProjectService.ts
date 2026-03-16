import { ProjectFilter } from "./ProjectFilter";
import { Project } from "./ProjectModel";
import { ProjectRepository } from "./ProjectRepository";

export class ProjectService{

    private projectRepo = new ProjectRepository();

    async GetById(id: number): Promise<Project | undefined> {
        return await this.projectRepo.GetById(id) ?? undefined;
    }

    async GetAll(filter?: ProjectFilter): Promise<Project[]>{
        return this.projectRepo.GetAll(filter)
    }

    async Create(name: string){
        
        const project: Project = {
            Name: name
        }
    }
}