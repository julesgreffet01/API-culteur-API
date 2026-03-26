import { UUID } from "node:crypto";
import {Service} from "../Service/ServiceModel";
import {Monitoring} from "./MonitoringModel";


export class MonitoringServiceModel {
    id : number;
    monitoringId: Monitoring;
    serviceUUID: UUID
    minValue: number;
    maxValue: number;

    constructor(id: number, monitoringId: Monitoring, serviceUUID: UUID,minValue: number, maxValue: number ) {
        this.id = id;
        this.monitoringId = monitoringId;
        this.serviceUUID = serviceUUID;
        this.minValue = minValue;
        this.maxValue = maxValue;
    }
}