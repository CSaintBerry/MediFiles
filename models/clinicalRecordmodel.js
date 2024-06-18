const connection = require('../app');

const ClinicalRecord = {
  createClinicalRecord: (clinicalRecordData, callback) => {
    const query = 'INSERT INTO clinical_records SET ?';
    connection.query(query, clinicalRecordData, callback);
  },
  getClinicalRecordById: (clinicalRecordId, callback) => {
    const query = 'SELECT * FROM clinical_records WHERE id = ?';
    connection.query(query, [clinicalRecordId], callback);
  },
  updateClinicalRecord: (id, historyData, callback) => {
    const query = 'UPDATE clinical_records SET ? WHERE id = ?';
    connection.query(query, [historyData, id], callback);
  }
};

module.exports = ClinicalRecord;

