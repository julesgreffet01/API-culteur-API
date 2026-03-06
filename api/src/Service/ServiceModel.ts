import { UUID } from "node:crypto";
import {Project} from "./../Project/ProjectModel"
import {Status} from "./StatusModel"
import {Port} from "./PortModel"


export class Service {
    
    uuid: UUID;
    image: string;
    started_since: Date;
    name: string;
    Project: Project;
    Status: Status;
    Ports: Port[];

    constructor(uuid: UUID, image: string , started_since: Date ,name: string , Project: Project, Status: Status, Ports: Port[]){
        this.uuid = uuid
        this.image = image
        this.started_since = started_since
        this.name = name
        this.Project = Project
        this.Status = Status
        this.Ports = Ports
    }
}