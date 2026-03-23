"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const ProjectService_1 = require("./ProjectService");
class ProjectController {
    constructor() {
        this.projectService = new ProjectService_1.ProjectService();
    }
    async GetById(req) {
        const { id } = req.query;
        try {
            const service = this.projectService.GetById(Number(req.query.id));
            return {
                Success: true,
                Data: service,
                Message: "Resultat du projet"
            };
        }
        catch (err) {
            return {
                Success: false,
                Data: null,
                ErrorCode: err.name,
                Message: err.message
            };
        }
    }
}
exports.ProjectController = ProjectController;
