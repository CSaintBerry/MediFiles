const express = require('express');
const router = express.Router();
const clinicalRecordController = require('../controllers/clinicalRecordcontroller');

// Definir rutas y sus callbacks
router.get('/:id', clinicalRecordController.getClinicalRecordById);
router.post('/', clinicalRecordController.createClinicalRecord);
router.put('/:id', clinicalRecordController.updateClinicalRecord);
router.post('/addToQueue', clinicalRecordController.addToQueue);

module.exports = router;
