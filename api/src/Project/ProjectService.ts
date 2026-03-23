import { ProjectDAO } from "./ProjectDAO";
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

    async Create(data: ProjectFilter){
        
        const project: ProjectDAO = {
            id:
            name: data.name
            createdAt:
            userId:
        }
        return this.projectRepo.Create(project)
    }


    async Update(data: ProjectFilter){
        
        const project: ProjectDAO = {
            id:
            name: data.name
            createdAt:
            userId:
        }
        return this.projectRepo.Update(project)
    }

    async Delete(id: number){
        return this.projectRepo.Delete(id)
    }
}