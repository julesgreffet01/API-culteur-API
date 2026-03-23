"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserService_1 = require("./UserService");
class UserController {
    constructor() {
        this.userService = new UserService_1.UserService();
    }
    async GetAll(req) {
        try {
            const { name, username, role } = req.query;
            const filters = {
                name: req.query.name,
                username: req.query.username,
                role: req.query.role
            };
            const users = await this.userService.GetAll(filters);
            return {
                Success: true,
                Data: users,
                Message: "Total des users"
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
    async GetById(req) {
        const { id } = req.query;
        try {
            const user = this.userService.GetById(Number(req.query.id));
            return {
                Success: true,
                Data: user,
                Message: "Resultat du user"
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
exports.UserController = UserController;
