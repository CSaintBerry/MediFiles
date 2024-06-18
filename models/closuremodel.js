const connection = require('../app');

const Queue = {
    getDailyQueue: (start, end, callback) => {
        const sql = 'SELECT q.*, p.nombre_apellido, p.edad, p.sexo FROM queue q INNER JOIN patients p ON q.patient_id = p.id WHERE q.date_added BETWEEN ? AND ?';
        connection.query(sql, [start, end], callback);
    },
};

module.exports = Queue;
