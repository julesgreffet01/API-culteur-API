import {MonitoringRepository} from "../Monitoring/MonitoringRepository";
import {Monitoring} from "./MonitoringModel";
import {MonitoringFilter} from "./MonitoringFilter";
import {MeasureModel} from "./MeasureModel";

export class MonitoringServiceService {

    private MonitoringRepository = new MonitoringRepository();

    async GetAllMeasures(filter: MonitoringFilter): Promise<MeasureModel[]> {
        console.log(this.MonitoringRepository.GetAllMeasures());
        return await this.MonitoringRepository.GetAllMeasures(filter)
    }
}