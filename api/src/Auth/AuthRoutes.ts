import { Router } from "express";
import { AuthController } from "./AuthController";
import type {Response, Request} from "express";

const router = Router();
const controller = new AuthController();

router.post("/login", (req: Request, res: Response) => controller.login(req, res));

export const AuthRouter = router;