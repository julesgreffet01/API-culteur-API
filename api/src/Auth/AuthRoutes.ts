import { Router } from "express";
import { AuthController } from "./AuthController";

const router = Router();
const controller = new AuthController();

router.get("/login", (req, res) => controller.login(req, res));

export const AuthRouter = router;