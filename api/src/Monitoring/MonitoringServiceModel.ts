import { UUID } from "node:crypto";
import {Service} from "../Service/ServiceModel";
import {Monitoring} from "./MonitoringModel";


export class MonitoringServiceModel {
    id : number;
    monitoringId: Monitoring;
    serviceUUID: UUID
    minValue: number;
    maxValue: number;

    constructor(id: number, monitoringId: Monitoring, minValue: number, maxValue: number, serviceUUID: UUID) {
        this.id = id;
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.monitoringId = monitoringId;
        this.serviceUUID = serviceUUID;
    }
}