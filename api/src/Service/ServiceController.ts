import {ServiceService} from "./ServiceService";
import {Request, Response} from "express";
import {Service} from "./ServiceModel";
import {Result} from "../Utils/Result";
import {ProjectRepository} from "../Project/ProjectRepository";
import {Port} from "./PortModel";
import {Project} from "../Project/ProjectModel";

export class ServiceController {
    private serviceService = new ServiceService()
    private projectRepository = new ProjectRepository()

    async GetAll(req: Request, res: Response) {
        try {
            const id = req.params.id;

            const services = await this.serviceService.GetAll(Number(id));

            res.json({
                Success: true,
                Data: services,
                Message: "Total des services de ce projet"
            });

        } catch (err) {
            res.status(500).json({
                Success: false,
                ErrorCode: (err as Error).name,
                Message: (err as Error).message
            });
        }
    }

    async GetById(req: Request, res: Response) {
        try {
            let uuidParam = req.params.uuid;
            const uuid: string = Array.isArray(uuidParam) ? uuidParam[0] : uuidParam;

            const services = await this.serviceService.GetById(uuid);

            res.json({
                Success: true,
                Data: services,
                Message: "detail services "
            });

        } catch (err) {
            res.status(500).json({
                Success: false,
                ErrorCode: (err as Error).name,
                Message: (err as Error).message
            });
        }
    }

    async Create(req: Request, res: Response): Promise<void> {
        const {project_id} = req.params;
        console.log("CREATE");
        const {name, image, ports} = req.body
        const project = await this.projectRepository.GetById(Number(project_id));
        if(!project){
            res.status(400).json({
                Success: false,
                ErrorCode: "400",
                Message: "Project not found"
            })
            return
        }

        const resultPorts: Port[] = ports.map((portString: string) => {
            return {
                Id: 0,
                Libelle: portString
            };
        });
        const service: Service = {
            Uuid: "",
            Image: image,
            Name: name,
            Status: null,
            StartedSince: new Date(), //on s en fout de ca
            Ports: resultPorts,
            Project: project,
        }
        try{
            await this.serviceService.Create(service);
            res.status(200).json({
                Success: true,
                Data: service,
                Message: "Created service"
            })
        } catch (err) {
            res.status(500).json({
                Success: false,
                ErrorCode: "500",
                Message: (err as Error).message
            })
        }

    }

    async Update(req: Request, res: Response): Promise<void> {
        try {
            const { uuid } = req.params;
            const {name} = req.body;
            await this.serviceService.Update(uuid as string, name)
            res.status(200).json({
                Success: true,
                Data: name,
                Message: "Updated service"
            })
        } catch (err) {
            res.status(500).json({
                Success: false,
                ErrorCode: "500",
                Message: (err as Error).message
            })
            return
        }

    }
    //
    // async Delete(req: Request, res: Response): Promise<Service> {
    //     const { uuid } = req.params;
    // }
    //
    // async Start(req: Request, res: Response): Promise<Service> {
    //     const { uuid } = req.params;
    // }
    //
    // async Stop(req: Request, res: Response): Promise<Service> {
    //     const { uuid } = req.params;
    // }
    //
    // async Restart(req: Request, res: Response): Promise<Service> {
    //     const { uuid } = req.params;
    // }
    async GetCountServiceOfProject(req: Request, res: Response){
        try {
            let id = req.params.id;
            const services = await this.serviceService.getCount(Number(id));

            res.json({
                Success: true,
                Data: services,
                Message: "Total des services de ce projet"
            });

        } catch (err) {
            res.status(500).json({
                Success: false,
                ErrorCode: (err as Error).name,
                Message: (err as Error).message
            });
        }
    }
}