const express = require('express');
const router = express.Router();
const ReportController = require('../controllers/reportcontroller');

router.post('/generate', ReportController.generateReport);

module.exports = router;
