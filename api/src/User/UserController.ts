import { Result } from "../Utils/Result";
import { UserService } from "./UserService"
import { Request } from "express";
import { UserFilter } from "./UserFilter"


export class UserController{
    
    private userService = new UserService()

    async GetAll(req: Request): Promise<Result> {
        try {
            const { name, username, role } = req.query;

            const filter: UserFilter = {
                name: name as string,
                username: username as string,
                role: role as string
            }

            const users = await this.userService.GetAll(filter)
            return {
                Success: true,
                Data: users,
                Message: "Total des users"
            }
        } catch (err) {
            return {
                Success: false,
                Data: null,
                ErrorCode: (err as Error).name,
                Message: (err as Error).message
            };
        }
    }


    async GetById(req: Request): Promise<Result> {
        const { id } = req.query;
        try {
            const user = this.userService.GetById(Number(id));
            return {
                Success: true,
                Data: user,
                Message: "Resultat du user"
            }
        } catch (err) {
            return {
                Success: false,
                Data: null,
                ErrorCode: (err as Error).name,
                Message: (err as Error).message
            };
        }
    }

}
