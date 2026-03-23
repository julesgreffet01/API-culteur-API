import {Service} from "../Service/ServiceModel";
import {Monitoring} from "./MonitoringModel";

export class MonitoringServiceModel {
    id : number;
    monitoringId: Monitoring;
    serviceUuid: Service;
    minValue: number;
    maxValue: number;

    constructor(id: number, monitoringId: Monitoring, serviceUuid: Service, minValue: number, maxValue: number) {
        this.id = id;
        this.monitoringId = monitoringId;
        this.serviceUuid = serviceUuid;
        this.minValue = minValue;
        this.maxValue = maxValue;
    }
}