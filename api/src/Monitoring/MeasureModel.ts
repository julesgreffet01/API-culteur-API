import {MonitoringServiceModel} from "./MonitoringServiceModel";

export class MeasureModel {
    id: number;
    monitoringId: MonitoringServiceModel;
    value: number;
    measured_at: string;

    constructor(id: number, monitoringId: MonitoringServiceModel, value: number, measured_at: string) {
        this.id = id;
        this.monitoringId = monitoringId;
        this.value = value;
        this.measured_at = measured_at;
    }
}