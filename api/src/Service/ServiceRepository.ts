import { ReadOnlyRepository } from "../BasicSkeleton/ReadOnlyRepository";
import { Service } from "./ServiceModel";
import { Project } from "./../Project/ProjectModel";
import { Status } from "./StatusModel";
import { Port } from "./PortModel";
import { db } from "../Db/Db";
import { UUID } from "node:crypto";

export class ServiceRepository extends ReadOnlyRepository<Service>{

      constructor() {
        super(db);
      }
    
      async GetAll(): Promise<Service[] | null>{
        const res = await this.db.query(`
            SELECT s.uuid, s.image , s.started_since, s.name AS sname,
            p.id AS pid, p.name AS pname, p.created_at,
            st.id AS sid, st.libelle
            FROM services s
            INNER JOIN projects p ON s.project_id = p.id
            INNER JOIN status st ON s.status_id = st.id`);

            if (res.rows.length === 0) 
                {return null;
            }

            const services :Service[] = []

            for (const data of res.rows) {
                const resport = await this.db.query(`
                    SELECT sp.port_id, p.libelle from services_ports sp 
                    INNER JOIN port p on sp.port_id = p.id
                    WHERE sp.service_uuid = $1
                    `, [data.uuid])

                // wallah c'est trop puissant ca
                const ports: Port[] = resport.rows.map(pdata => ({
                    Id: pdata.id,
                    Libelle: pdata.libelle
                }));

                const project: Project = {
                    Id: data.pid,
                    Name: data.pname,
                    CreatedAt: data.created_at
                }
                const status: Status = {
                    Id: data.sid,
                    Libelle: data.libelle
                }
                const service: Service = {
                    Uuid: data.uuid,
                    Image: data.image,
                    StartedSince: data.started_since,
                    Name: data.sname,
                    Project: project,
                    Status: status,
                    Ports: ports
                } 

                services.push(service)
            }

        return services
      }

    
      async GetById(Id: UUID): Promise<Service | null>{
        const res = await this.db.query(`
            SELECT s.uuid, s.image , s.started_since, s.name AS sname,
            p.id AS pid, p.name AS pname, p.created_at,
            st.id AS sid, st.libelle
            FROM services s
            INNER JOIN projects p ON s.project_id = p.id
            INNER JOIN status st ON s.status_id = st.id
            WHERE s.uuid = $1`, [Id]);

            if (res.rows.length === 0) 
                {return null;
            }
            const resport = await this.db.query(`
                SELECT sp.port_id, p.libelle from services_ports sp 
                INNER JOIN port p on sp.port_id = p.id
                WHERE sp.service_uuid = $1
                `, [Id])

            // wallah c'est trop puissant ca
            const ports: Port[] = resport.rows.map(pdata => ({
                Id: pdata.id,
                Libelle: pdata.libelle
            }));

            const project: Project = {
                Id: res.rows[0].pid,
                Name: res.rows[0].pname,
                CreatedAt: res.rows[0].created_at
            }
            const status: Status = {
                Id: res.rows[0].sid,
                Libelle: res.rows[0].libelle
            }
            const service: Service = {
                Uuid: res.rows[0].uuid,
                Image: res.rows[0].image,
                StartedSince: res.rows[0].started_since,
                Name: res.rows[0].sname,
                Project: project,
                Status: status,
                Ports: ports
            } 

        return service
      }

        async GetAllByProjectId(ProjectId: number): Promise<Service[] | null> {
            const res = await this.db.query(`
            SELECT s.uuid, s.image , s.started_since, s.name AS sname,
            p.id AS pid, p.name AS pname, p.created_at,
            st.id AS sid, st.libelle
            FROM services s
            INNER JOIN projects p ON s.project_id = p.id
            INNER JOIN status st ON s.status_id = st.id
            WHERE p.id = $1`,[ProjectId]);

            if (res.rows.length === 0) 
                {return null;
            }

            const services :Service[] = []

            for (const data of res.rows) {
                const resport = await this.db.query(`
                    SELECT sp.port_id, p.libelle from services_ports sp 
                    INNER JOIN port p on sp.port_id = p.id
                    WHERE sp.service_uuid = $1
                    `, [data.uuid])

                // wallah c'est trop puissant ca
                const ports: Port[] = resport.rows.map(pdata => ({
                    Id: pdata.id,
                    Libelle: pdata.libelle
                }));

                const project: Project = {
                    Id: data.pid,
                    Name: data.pname,
                    CreatedAt: data.created_at
                }
                const status: Status = {
                    Id: data.sid,
                    Libelle: data.libelle
                }
                const service: Service = {
                    Uuid: data.uuid,
                    Image: data.image,
                    StartedSince: data.started_since,
                    Name: data.sname,
                    Project: project,
                    Status: status,
                    Ports: ports
                } 

                services.push(service)
            }

        return services
        }

}