const Patient = require('../models/patientmodel');

exports.createPatient = (req, res) => {
    const patientData = req.body;

    Patient.createPatient(patientData, (err, result) => {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.status(201).send({ message: 'Patient created successfully' });
        }
    });
};

exports.getPatientById = (req, res) => {
    const patientId = req.params.id;

    Patient.getPatientById(patientId, (err, patient) => {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.status(200).send(patient);
        }
    });
};



