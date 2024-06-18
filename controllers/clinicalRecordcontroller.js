const clinicalRecordModel = require('../models/clinicalRecordmodel');
const queue = require('../queue/clinicalrecordqueue');

exports.createClinicalRecord = (req, res) => {
  const clinicalRecordData = req.body;

  clinicalRecordModel.createClinicalRecord(clinicalRecordData, (err, result) => {
    if (err) {
      console.error('Error al crear la historia clínica:', err);
      res.status(500).send({ error: 'Error al crear la historia clínica', details: err });
    } else {
      res.status(201).send({ message: 'Historia clínica creada exitosamente' });
    }
  });
};

exports.getClinicalRecordById = (req, res) => {
  const { id } = req.params;

  clinicalRecordModel.getClinicalRecordById(id, (err, clinicalRecord) => {
    if (err) {
      console.error('Error al obtener la historia clínica:', err);
      res.status(500).send({ error: 'Error al obtener la historia clínica', details: err });
    } else {
      res.status(200).send(clinicalRecord);
    }
  });
};

exports.updateClinicalRecord = (req, res) => {
  const { id } = req.params;
  const historyData = req.body;

  clinicalRecordModel.updateClinicalRecord(id, historyData, (err, result) => {
    if (err) {
      console.error('Error al actualizar la historia clínica:', err);
      res.status(500).send({ message: 'Error al actualizar la historia clínica', details: err });
    } else {
      res.status(200).json({ message: 'Historia clínica actualizada exitosamente' });
    }
  });
};

exports.addToQueue = (req, res) => {
  const clinicalRecordData = req.body;

  queue.add('createClinicalRecord', clinicalRecordData)
    .then(() => {
      res.status(200).send({ message: 'Historia clínica añadida a la cola exitosamente' });
    })
    .catch(err => {
      console.error('Error al añadir a la cola:', err);
      res.status(500).send({ error: 'Error al añadir a la cola', details: err });
    });
};
