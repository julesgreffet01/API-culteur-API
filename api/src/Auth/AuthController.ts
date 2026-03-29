import {AuthService} from "./AuthService";
import { Request, Response } from "express";
import {Result} from "../Utils/Result";

export class AuthController {

    private authService = new AuthService();

    public async login(req: Request, res: Response) {
        const { username, password } = req.body;
        if (!username || !password) {
            const response: Result = {
                Success: false,
                ErrorCode: "INVALID_USERNAME",
                Message: "Username or password undefined",
            }
            res.send(response);
            return;
        }
        try{
            const token = await this.authService.login(username, password);
            const response: Result = {
                Success: true,
                Data: {token}
            }
            res.send(response);
            return;
        } catch(err){
            const response: Result = {
                Success: false,
                ErrorCode: "INVALID_USERNAME",
                Message: "Username or password false",
            }
            res.send(response);
            return;
        }

    }
}