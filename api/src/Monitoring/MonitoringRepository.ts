import {WriteRepository} from "../BasicSkeleton/WriteRepository";
import {db} from "../Db/Db";
import {MonitoringServiceModel} from "./MonitoringServiceModel";
import {MeasureModel} from "./MeasureModel";
import { UUID } from "node:crypto";
import {Monitoring} from "./MonitoringModel";
import {Service} from "../Service/ServiceModel";
import {ReadOnlyRepository} from "../BasicSkeleton/ReadOnlyRepository";
import {MonitoringFilter} from "./MonitoringFilter";

class MonitoringRepository extends ReadOnlyRepository<MonitoringServiceModel> {

    constructor() {
        super(db);
    }

    async GetAll(filter: MonitoringFilter): Promise<MonitoringServiceModel[]> {
        let query = `   
        SELECT ms.id ms.min_value ms.max_value ms.service_uuid m.libelle FROM monitorings_services ms
        INNER JOIN monitorings m ON ms.monitoring_id = m.id
        WHERE ms.service_uuid = (${filter.serviceUUID})
        `
        const conditions = [];
        const params = [];
        if (filter?.name) {
            conditions.push(`m.libelle = $${params.length +1}`);
            params.push(filter?.name);
        }
        if (conditions.length > 0) {
            query += "AND" + conditions.join('AND');
        }
        // TODO GET service -> GET MONITORING SERVICE LINK AVEC LE monitoring -> GET MEASURE QUI A L'ID DU MONITORING SERVICE
        return new Promise<MonitoringServiceModel[]>((resolve, reject) => {})
    }
    async GetAllMeasures(filter?: MonitoringFilter): Promise<MeasureModel[]> {

    }
    GetById(id: number | UUID): Promise<MonitoringServiceModel | null> {
        return Promise.resolve(null);
    }



}

export default MonitoringRepository