const express = require('express');
const router = express.Router();
const MonitoringServiceService = require('./MonitoringServiceService')

router.get('monitoring/', MonitoringServiceService.GetAllMeasures);
