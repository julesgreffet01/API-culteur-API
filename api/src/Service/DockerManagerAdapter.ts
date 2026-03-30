import {ServiceRepository} from "./ServiceRepository";
import {Service} from "./ServiceModel";

export class DockerManagerAdapter {

    private baseUrlService = "http://docker-manager-go-1:8080"
    async createService(service: ServiceRepository) {

    }

    async deleteService(id: string): Promise<Service> {

    }
}