const connection = require('../app');

const Queue = {
    addToQueue: (patient_id, callback) => {
        const sql = 'INSERT INTO queue (patient_id) VALUES (?)';
        connection.query(sql, [patient_id], callback);
    },
    removeFromQueue: (id, callback) => {
        const sql = 'DELETE FROM queue WHERE patient_id = ?';
        connection.query(sql, [id], callback);
    },
    getQueue: (callback) => {
        const sql = 'SELECT q.patient_id, p.nombre_apellido FROM queue q JOIN patients p ON q.patient_id = p.id';
        connection.query(sql, callback);
    },
    editPatient: (id, data, callback) => {
        const { nombre_apellido, edad, sexo, history } = data;
        const sql = 'UPDATE patients SET nombre_apellido = ?, edad = ?, sexo = ?, history = ? WHERE id = ?';
        connection.query(sql, [nombre_apellido, edad, sexo, history, id], callback);
    },
};

module.exports = Queue;

