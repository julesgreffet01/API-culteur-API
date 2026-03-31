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
                ports: service.Ports,
            }),
        }).then(res => res.json())
        if(reqToGo.Success === false){
            throw new Error(reqToGo.Error)
        }
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
        }).then(res => res.json())
        if(!reqToGo.Success){
            throw new Error('pas posssible de start')
        }
        console.log(reqToGo)
    }
    async RestartService(id: string): Promise<void> {
        const reqToGo = await fetch(`${this.baseUrlService}/services/${id}/restart`, {
            method: "POST",
        }).then(res => res.json())
        if(!reqToGo.Success){
            throw new Error('pas posssible de restart')
        }
        console.log(reqToGo)
    }

    async StopService(id: string): Promise<void> {
        const reqToGo = await fetch(`${this.baseUrlService}/services/${id}/stop`, {
            method: "POST",
        }).then(res => res.json())
        if(!reqToGo.Success){
            throw new Error('pas possible de stop')
        }
        console.log(reqToGo)
    }
}