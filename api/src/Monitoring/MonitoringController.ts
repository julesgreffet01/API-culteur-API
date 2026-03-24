import {MonitoringServiceService} from "./MonitoringServiceService";
import {MonitoringFilter} from "./MonitoringFilter";
import { Request, Response } from "express";
import {UUID} from "node:crypto";


export class MonitoringController {

    private MonitoringServiceService = new MonitoringServiceService();

    async GetAllMonitorings(req: Request, res: Response) {
        const {name} = req.query;
        const {serviceUUID} = req.query;
        const filter : MonitoringFilter = {
            serviceUUID: serviceUUID as UUID,
            name: name as string
        }
        try{
            const monitoring  = await this.MonitoringServiceService.GetAllMeasures(filter);
            res.json({
                Success: true,
                Data: monitoring,
                Message: "Monitoring"
            })
        } catch (err) {
        res.status(500).json({
            Success: false,
            Data: null,
            ErrorCode: (err as Error).name,
            Message: (err as Error).message
        })
    }


    }
}