const express = require('express');
const router = express.Router();
const ClosureController = require('../controllers/closurecontroller');

router.get('/daily-closure', ClosureController.getDailyClosure);

module.exports = router;
