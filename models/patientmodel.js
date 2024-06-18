const connection = require('../app');

const Patient = {
    createPatient: (patientData, callback) => {
        const query = 'INSERT INTO patients SET ?';
        connection.query(query, patientData, callback);
    },
    getPatientById: (patientId, callback) => {
        const query = 'SELECT * FROM patients WHERE id = ?';
        connection.query(query, [patientId], callback);
    },
    
};

module.exports = Patient;
