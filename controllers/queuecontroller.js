const Queue = require('../models/queuemodel');

exports.addToQueue = (req, res) => {
    const { patient_id } = req.body;

    Queue.addToQueue(patient_id, (err, result) => {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.status(201).send({ message: 'Patient added to queue' });
        }
    });
};

exports.removeFromQueue = (req, res) => {
    const { id } = req.params;

    Queue.removeFromQueue(id, (err, result) => {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.status(200).send({ message: 'Patient removed from queue' });
        }
    });
};

exports.getQueue = (req, res) => {
    Queue.getQueue((err, queue) => {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.status(200).send(queue);
        }
    });
};

exports.editPatient = (req, res) => {
    const { id } = req.params;
    const { nombre_apellido, edad, sexo, history } = req.body;

    Queue.editPatient(id, { nombre_apellido, edad, sexo, history }, (err, result) => {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.status(200).send({ message: 'Patient edited successfully' });
        }
    });
};
