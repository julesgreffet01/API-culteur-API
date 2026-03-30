import { Service } from "././ServiceModel";
import { ServiceRepository } from "./ServiceRepository";

export class ServiceService{

    private serviceRepo = new ServiceRepository();

    async GetById(id: string): Promise<Service | undefined> {
        return await this.serviceRepo.GetById(id) ?? undefined;
    }

    async GetAll(id: number): Promise<Service[]>{
        return this.serviceRepo.GetAll(id)
    }
    async getCount(id: number): Promise<number>{
        return this.serviceRepo.getCount(id)

    }
}