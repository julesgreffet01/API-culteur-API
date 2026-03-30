import {Project} from "./../Project/ProjectModel"
import {Status} from "./StatusModel"
import {Port} from "./PortModel"


export class Service {
    
    Uuid: string;
    Image: string;
    StartedSince: Date;
    Name: string;
    Project: Project;
    Status: Status | null;
    Ports: Port[];

    constructor(Uuid: string, Image: string , StartedSince: Date ,Name: string , Project: Project, Status: Status, Ports: Port[]){
        this.Uuid = Uuid
        this.Image = Image
        this.StartedSince = StartedSince
        this.Name = Name
        this.Project = Project
        this.Status = Status
        this.Ports = Ports
    }
}