"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const ProjectRepository_1 = require("./ProjectRepository");
class ProjectService {
    constructor() {
        this.projectRepo = new ProjectRepository_1.ProjectRepository();
    }
    async GetById(id) {
        return await this.projectRepo.GetById(id) ?? undefined;
    }
    async GetAll(filter) {
        return this.projectRepo.GetAll(filter);
    }
    async Create(name) {
        const project = {
            Name: name
        };
    }
}
exports.ProjectService = ProjectService;
