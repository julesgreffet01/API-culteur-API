import {WriteRepository} from "../BasicSkeleton/WriteRepository";
import {db} from "../Db/Db";
import {MonitoringServiceModel} from "./MonitoringServiceModel";
import {MeasureModel} from "./MeasureModel";
import { UUID } from "node:crypto";
import {Monitoring} from "./MonitoringModel";
import {Service} from "../Service/ServiceModel";
import {ReadOnlyRepository} from "../BasicSkeleton/ReadOnlyRepository";
import {MonitoringFilter} from "./MonitoringFilter";

export class MonitoringRepository extends WriteRepository<MonitoringServiceModel,MonitoringServiceModel> {

    Create(data: MonitoringServiceModel): Promise<MonitoringServiceModel> {
        throw new Error("Method not implemented.");
    }
    Update(data: MonitoringServiceModel): Promise<MonitoringServiceModel> {
        throw new Error("Method not implemented.");
    }
    Delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

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
        const res = await this.db.query(query,params);
        const monitoringServiceModels: MonitoringServiceModel[] = res.rows.map(data => ({
            id: data.id,
            monitoringId: data.monitoringId,
            serviceUUID: data.serviceUUID,
            minValue: data.minValue,
            maxValue: data.maxValue,
        }));
        return monitoringServiceModels;
    }

    async GetAllMeasures(filter?: MonitoringFilter): Promise<MeasureModel[]> {
        let query = `
        SELECT 
            ms.id AS monitoring_service_id,
            ms.min_value,
            ms.max_value,
            ms.service_uuid,
    
            m.id AS monitoring_id,
            m.libelle,
    
            me.id AS measure_id,
            me.value,
            me.measured_at
    
        FROM monitorings_services ms
        INNER JOIN monitorings m ON ms.monitoring_id = m.id
        LEFT JOIN measures me ON me.monitoring_service_id = ms.id
    
        WHERE ms.service_uuid = $1
        `;

        const params: any[] = [filter?.serviceUUID];
        let index = 2;

        if (filter?.name) {
            query += ` AND m.libelle = $${index}`;
            params.push(filter.name);
            index++;
        }

        query += ` ORDER BY me.measured_at DESC`;

        const res = await this.db.query(query, params);
        console.log(query);
        console.log('-------------');
        console.log(params);
        const measures: MeasureModel[] = res.rows
            .filter(data => data.measure_id !== null) // évite les null si pas de measure
            .map(data => {

                const monitoring = new Monitoring(
                    data.monitoring_id,
                    data.libelle
                );

                const monitoringService = new MonitoringServiceModel(
                    data.monitoring_service_id,
                    monitoring,
                    data.service_uuid,
                    data.min_value,
                    data.max_value
                );

                return new MeasureModel(
                    data.measure_id,
                    monitoringService,
                    data.value,
                    data.measured_at
                );
            });
        return measures;
    }

    GetById(id: number | UUID): Promise<MonitoringServiceModel | null> {
        return Promise.resolve(null);
    }



}

export default MonitoringRepository