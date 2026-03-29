import {NextFunction, Request, Response} from "express";
import {LogsRepository} from "./LogsRepository";

export async function logMiddleware (req: Request, res: Response, next: NextFunction) {
    const logRepo = new LogsRepository()
    const ip = (req.ip as string).replace("::ffff:", "") as string;
    await logRepo.insertIn(ip, req.userId);
    next();
}