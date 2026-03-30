import {ServiceService} from "./ServiceService";
import {Request, Response} from "express";
import {Service} from "./ServiceModel";

export class ServiceController {
    private serviceService = new ServiceService()

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

    async Create(req: Request, res: Response): Promise<Service> {

    }

    async Update(req: Request, res: Response): Promise<Service> {
        const { uuid } = req.params;
    }

    async Delete(req: Request, res: Response): Promise<Service> {
        const { uuid } = req.params;
    }

    async Start(req: Request, res: Response): Promise<Service> {
        const { uuid } = req.params;
    }

    async Stop(req: Request, res: Response): Promise<Service> {
        const { uuid } = req.params;
    }

    async Restart(req: Request, res: Response): Promise<Service> {
        const { uuid } = req.params;
    }
}