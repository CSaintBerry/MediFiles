const connection = require('../app');

const Report = {
    generateReport: (filters, callback) => {
        let query = 'SELECT * FROM patients WHERE 1=1';
        const values = [];

        if (filters.age_filter) {
            if (filters.age_filter === '0-11') {
                query += ' AND edad <= ?';
                values.push(11);
            } else if (filters.age_filter === '1-5') {
                query += ' AND edad BETWEEN ? AND ?';
                values.push(1, 5);
            } else if (filters.age_filter === '6-9') {
                query += ' AND edad BETWEEN ? AND ?';
                values.push(6, 9);
            } else if (filters.age_filter === '10-12') {
                query += ' AND edad BETWEEN ? AND ?';
                values.push(10, 12);
            }
        }

        if (filters.gender_filter) {
            query += ' AND sexo = ?';
            values.push(filters.gender_filter);
        }

        if (filters.date_from) {
            query += ' AND created_at >= ?';
            values.push(filters.date_from);
        }

        if (filters.date_to) {
            query += ' AND created_at <= ?';
            values.push(filters.date_to);
        }

        connection.query(query, values, callback);
    },
};

module.exports = Report;
