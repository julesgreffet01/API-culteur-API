import { Router } from "express"
import {MonitoringController} from "../Monitoring/MonitoringController";
import { ServiceController } from "./ServiceController";

const router = Router()
const controller = new MonitoringController()
const controllerService = new ServiceController()

router.get("/:uuid/monitoring", (req, res) => controller.GetAllMonitorings(req, res));
router.get("/:uuid", (req, res) => controllerService.GetById(req, res));

router.put("/:uuid", async (req, res) => controllerService.Update(req, res));
// router.delete("/:uuid", async (req, res) => controllerService.Delete(req, res));
//
// router.post("/:uuid/start", async (req, res) => controllerService.Start(req, res));
// router.post("/:uuid/stop", async (req, res) => controllerService.Stop(req, res));
// router.post("/:uuid/restart", async (req, res) => controllerService.Restart(req, res));

export const ServiceRouter = router;
