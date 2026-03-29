import { Router } from "express";
import { UserController } from "./UserController";
import {verifyDevopsMiddleware} from "../Auth/AuthMiddleware";

const router = Router();
const controller = new UserController();

router.get("/", verifyDevopsMiddleware, (req, res) => controller.GetAll(req, res));
router.get("/me", (req, res) => controller.GetMe(req, res));
router.get("/:id", verifyDevopsMiddleware, (req, res) => controller.GetById(req, res));


export const UserRouter = router;