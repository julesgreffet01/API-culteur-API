import { Service } from "./ServiceModel";
import { ServiceRepository } from "./ServiceRepository";

export class ServiceService{

    private serviceRepo = new ServiceRepository();

    async GetById(id: string): Promise<Service | undefined> {
        return await this.serviceRepo.GetById(id) ?? undefined;
    }

    async GetAll(id: number): Promise<Service[]>{
        return this.serviceRepo.GetAll(id)
    }

    async Create(service: Service): Promise<Service> {

    }

    async Update(id: string, service: Service): Promise<Service> {

    }

    async Delete(id: string): Promise<Service> {

    }

    async Start(service: Service): Promise<Service> {

    }

    async Stop(service: Service): Promise<Service> {

    }

    async Restart(service: Service): Promise<Service> {

    }
}