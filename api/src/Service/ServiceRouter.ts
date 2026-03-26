import { Router } from "express"
import {MonitoringController} from "../Monitoring/MonitoringController";
import { ServiceController } from "./ServiceController";

const router = Router()
const controller = new MonitoringController()
const controllerService = new ServiceController()

router.get("/:uuid/monitoring", (req, res) => controller.GetAllMonitorings(req, res));
router.get("/:uuid", (req, res) => controllerService.GetById(req, res));



export const ServiceRouter = router;
