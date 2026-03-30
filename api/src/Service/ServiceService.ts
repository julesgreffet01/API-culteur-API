import { Service } from "./ServiceModel";
import { ServiceRepository } from "./ServiceRepository";
import {DockerManagerAdapter} from "./DockerManagerAdapter";

export class ServiceService{

    private serviceRepo = new ServiceRepository();
    private dockerManagerAdapter = new DockerManagerAdapter();

    async GetById(id: string): Promise<Service | undefined> {
        return await this.serviceRepo.GetById(id) ?? undefined;
    }

    async GetAll(id: number): Promise<Service[]> {
        return this.serviceRepo.GetAll(id)
    }
    async getCount(id: number): Promise<number>{
        return this.serviceRepo.getCount(id)
    }

    async Create(service: Service): Promise<Service> {
        return await this.dockerManagerAdapter.CreateService(service);
    }

    // async Update(id: string, service: Service): Promise<Service> {
    //     service.Uuid = id;
    //     this.serviceRepo.Update(service);        //todo a faire
    // }

    async Delete(id: string): Promise<void> {
        return await this.dockerManagerAdapter.DeleteService(id)
    }

    async Start(id: string): Promise<void> {
        return await this.dockerManagerAdapter.StartService(id)
    }

    async Stop(id: string): Promise<void> {
        return await this.dockerManagerAdapter.StopService(id)
    }

    async Restart(id: string): Promise<void> {
        return await this.dockerManagerAdapter.RestartService(id)
    }
}