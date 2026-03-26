import { Router } from "express"
import { ProjectController } from "./ProjectController"
import { ServiceController } from "./../Service/ServiceController";


const router = Router()
const controller = new ProjectController();
const controllerService = new ServiceController()


router.get("/", (req, res) => controller.GetAll(req, res));
router.get("/:id", (req, res) => controller.GetById(req, res));
router.post("/create", (req, res) => controller.Create(req, res));
router.get("/:id/services", (req, res) => controllerService.GetAll(req, res));


export const ProjectRouter = router;