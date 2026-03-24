import { Router } from "express";
import { UserController } from "./UserController";

const router = Router();
const controller = new UserController();

router.get("/", (req, res) => controller.GetAll(req, res));
router.get("/:id", (req, res) => controller.GetById(req, res));

export const UserRouter = router;