"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const UserRepository_1 = require("./UserRepository");
class UserService {
    constructor() {
        this.userRepo = new UserRepository_1.UserRepository();
    }
    async GetById(id) {
        return await this.userRepo.GetById(id) ?? undefined;
    }
    async GetAll(filter) {
        return await this.userRepo.GetAll(filter);
    }
}
exports.UserService = UserService;
