"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRepository = void 0;
const ReadOnlyRepository_1 = require("../BasicSkeleton/ReadOnlyRepository");
const Db_1 = require("../Db/Db");
class ServiceRepository extends ReadOnlyRepository_1.ReadOnlyRepository {
    constructor() {
        super(Db_1.db);
    }
    async GetAll() {
        const res = await this.db.query(`
            SELECT s.uuid, s.image , s.started_since, s.name AS sname,
            p.id AS pid, p.name AS pname, p.created_at,
            st.id AS sid, st.libelle
            FROM services s
            INNER JOIN projects p ON s.project_id = p.id
            INNER JOIN status st ON s.status_id = st.id`);
        if (res.rows.length === 0) {
            return null;
        }
        const services = [];
        for (const data of res.rows) {
            const resport = await this.db.query(`
                    SELECT sp.port_id, p.libelle from services_ports sp 
                    INNER JOIN port p on sp.port_id = p.id
                    WHERE sp.service_uuid = $1
                    `, [data.uuid]);
            // wallah c'est trop puissant ca
            const ports = resport.rows.map(pdata => ({
                Id: pdata.id,
                Libelle: pdata.libelle
            }));
            const project = {
                Id: data.pid,
                Name: data.pname,
                CreatedAt: data.created_at
            };
            const status = {
                Id: data.sid,
                Libelle: data.libelle
            };
            const service = {
                Uuid: data.uuid,
                Image: data.image,
                StartedSince: data.started_since,
                Name: data.sname,
                Project: project,
                Status: status,
                Ports: ports
            };
            services.push(service);
        }
        return services;
    }
    async GetById(Id) {
        const res = await this.db.query(`
            SELECT s.uuid, s.image , s.started_since, s.name AS sname,
            p.id AS pid, p.name AS pname, p.created_at,
            st.id AS sid, st.libelle
            FROM services s
            INNER JOIN projects p ON s.project_id = p.id
            INNER JOIN status st ON s.status_id = st.id
            WHERE s.uuid = $1`, [Id]);
        if (res.rows.length === 0) {
            return null;
        }
        const resport = await this.db.query(`
                SELECT sp.port_id, p.libelle from services_ports sp 
                INNER JOIN port p on sp.port_id = p.id
                WHERE sp.service_uuid = $1
                `, [Id]);
        // wallah c'est trop puissant ca
        const ports = resport.rows.map(pdata => ({
            Id: pdata.id,
            Libelle: pdata.libelle
        }));
        const project = {
            Id: res.rows[0].pid,
            Name: res.rows[0].pname,
            CreatedAt: res.rows[0].created_at
        };
        const status = {
            Id: res.rows[0].sid,
            Libelle: res.rows[0].libelle
        };
        const service = {
            Uuid: res.rows[0].uuid,
            Image: res.rows[0].image,
            StartedSince: res.rows[0].started_since,
            Name: res.rows[0].sname,
            Project: project,
            Status: status,
            Ports: ports
        };
        return service;
    }
    async GetAllByProjectId(ProjectId) {
        const res = await this.db.query(`
            SELECT s.uuid, s.image , s.started_since, s.name AS sname,
            p.id AS pid, p.name AS pname, p.created_at,
            st.id AS sid, st.libelle
            FROM services s
            INNER JOIN projects p ON s.project_id = p.id
            INNER JOIN status st ON s.status_id = st.id
            WHERE p.id = $1`, [ProjectId]);
        if (res.rows.length === 0) {
            return null;
        }
        const services = [];
        for (const data of res.rows) {
            const resport = await this.db.query(`
                    SELECT sp.port_id, p.libelle from services_ports sp 
                    INNER JOIN port p on sp.port_id = p.id
                    WHERE sp.service_uuid = $1
                    `, [data.uuid]);
            // wallah c'est trop puissant ca
            const ports = resport.rows.map(pdata => ({
                Id: pdata.id,
                Libelle: pdata.libelle
            }));
            const project = {
                Id: data.pid,
                Name: data.pname,
                CreatedAt: data.created_at
            };
            const status = {
                Id: data.sid,
                Libelle: data.libelle
            };
            const service = {
                Uuid: data.uuid,
                Image: data.image,
                StartedSince: data.started_since,
                Name: data.sname,
                Project: project,
                Status: status,
                Ports: ports
            };
            services.push(service);
        }
        return services;
    }
}
exports.ServiceRepository = ServiceRepository;
