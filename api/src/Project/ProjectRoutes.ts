import { Router } from "express"
import { ProjectController } from "./ProjectController"

const router = Router()
const controller = new ProjectController();

router.get("/", (req, res) => controller.GetAll(req, res));
router.get("/:id", (req, res) => controller.GetById(req, res));
router.post("/create", (req, res) => controller.Create(req, res));

export const ProjectRouter = router;