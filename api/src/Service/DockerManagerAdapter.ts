import {ServiceRepository} from "./ServiceRepository";
import {Service} from "./ServiceModel";

export class DockerManagerAdapter {

    private baseUrlService = "http://docker-manager-go-1:8080"
    async CreateService(service: Service): Promise<Service> {
        const reqToGo = await fetch(`${this.baseUrlService}/services/create`, {
            method: "POST",
            body: JSON.stringify({
                uuid: "",
                image: service.Image,
                started_since: "",
                status_id: 0,
                name: service.Name,
                projectid: service.Project.Id,
                ports: JSON.stringify(service.Ports),
            }),
        }).then(res => res.text())
        console.log(reqToGo)
        return service
    }

    async DeleteService(id: string): Promise<void> {
        const reqToGo = await fetch(`${this.baseUrlService}/services/${id}/delete`, {
            method: "DELETE",
        })
        console.log(reqToGo)
    }

    async StartService(id: string): Promise<void> {
        const reqToGo = await fetch(`${this.baseUrlService}/services/${id}/start`, {
            method: "POST",
        })
        console.log(reqToGo)
    }
    async RestartService(id: string): Promise<void> {
        const reqToGo = await fetch(`${this.baseUrlService}/services/${id}/restart`, {
            method: "POST",
        })
        console.log(reqToGo)
    }

    async StopService(id: string): Promise<void> {
        const reqToGo = await fetch(`${this.baseUrlService}/services/${id}/stop`, {
            method: "POST",
        })
        console.log(reqToGo)
    }
}