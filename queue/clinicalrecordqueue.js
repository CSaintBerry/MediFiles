const Queue = require('bull');
const ClinicalRecord = require('../models/clinicalRecordmodel');

const queue = new Queue('clinicalrecordqueue', {
  redis: {
    host: '127.0.0.1',
    port: 6379,
  },
});

queue.process('createClinicalRecord', async (job) => {
  return new Promise((resolve, reject) => {
    ClinicalRecord.createClinicalRecord(job.data, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
});

module.exports = queue;
