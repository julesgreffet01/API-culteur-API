"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
class Project {
    constructor(Name, Id, CreatedAt, User) {
        this.Id = Id;
        this.Name = Name;
        this.CreatedAt = CreatedAt;
        this.User = User;
    }
}
exports.Project = Project;
