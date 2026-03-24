import { Router } from "express"
import {MonitoringController} from "../Monitoring/MonitoringController";

const router = Router()
const controller = new MonitoringController()

router.get("/:id/Monitoring", (req, res) => controller.GetAllMonitorings(req, res));

export const ServiceRoutes = router;
