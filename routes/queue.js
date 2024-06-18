const express = require('express');
const router = express.Router();
const QueueController = require('../controllers/queuecontroller');

// Ruta para añadir un paciente a la cola
router.post('/add', QueueController.addToQueue);

// Ruta para eliminar un paciente de la cola
router.delete('/remove/:id', QueueController.removeFromQueue);

// Ruta para obtener todos los pacientes en la cola
router.get('/', QueueController.getQueue);

// Ruta para editar un paciente en la cola
router.put('/edit/:id', QueueController.editPatient);

module.exports = router;

