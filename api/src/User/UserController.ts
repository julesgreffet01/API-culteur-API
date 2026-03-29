import { UserService } from "./UserService"
import { Request, Response } from "express";
import { UserFilter } from "./UserFilter"


export class UserController{
    
    private userService = new UserService()

    async GetAll(req: Request, res: Response){
        try {
            const { name, username, role } = req.query;       

            const filter: UserFilter = {
                name: name as string,
                username: username as string,
                role: role as string
            };        

            const users = await this.userService.GetAll(filter);      

            res.json({
                Success: true,
                Data: users,
                Message: "Total des users"
            });       

            } catch (err) {
                res.status(500).json({
                    Success: false,
                    ErrorCode: (err as Error).name,
                    Message: (err as Error).message
                });
            }
        }


    async GetById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const user = await this.userService.GetById(Number(id));
            res.json({
                Success: true,
                Data: user,
                Message: "Resultat du user"
            })
        } catch (err) {
            res.json({
                Success: false,
                Data: null,
                ErrorCode: (err as Error).name,
                Message: (err as Error).message
            })
        }
    }

    async GetMe(req: Request, res: Response) {
        const id = req.userId!;
        try {
            const user = await this.userService.GetById(Number(id));
            res.json({
                Success: true,
                Data: user,
                Message: "Resultat du user"
            })
        } catch (err) {
            res.json({
                Success: false,
                Data: null,
                ErrorCode: (err as Error).name,
                Message: (err as Error).message
            })
        }
    }

}
