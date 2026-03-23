"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
class Service {
    constructor(Uuid, Image, StartedSince, Name, Project, Status, Ports) {
        this.Uuid = Uuid;
        this.Image = Image;
        this.StartedSince = StartedSince;
        this.Name = Name;
        this.Project = Project;
        this.Status = Status;
        this.Ports = Ports;
    }
}
exports.Service = Service;
