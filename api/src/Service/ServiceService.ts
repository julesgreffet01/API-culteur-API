import { UUID } from "node:crypto";
import { Service } from "././ServiceModel";
import { ServiceRepository } from "./ServiceRepository";

export class ProjectService{

    private serviceRepo = new ServiceRepository();

    async GetById(id: UUID): Promise<Service | undefined> {
        return await this.serviceRepo.GetById(id) ?? undefined;
    }

    async GetAll(): Promise<Service[]>{
        return this.serviceRepo.GetAll()
    }

}