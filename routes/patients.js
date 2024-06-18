const express = require('express');
const router = express.Router();
const db = require('../app');

// Ruta de paciente
router.post('/create', (req, res) => {
    const { name, age, gender, history } = req.body;
    const sql = 'INSERT INTO patients (name, age, gender, history) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, age, gender, history], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating patient record' });
        }
        res.status(200).json({ message: 'Patient record created successfully' });
    });
});

router.get('/search', (req, res) => {
    const { query } = req.query;
    const sql = 'SELECT * FROM patients WHERE name LIKE ?';
    db.query(sql, [`%${query}%`], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error searching patients' });
        }
        res.status(200).json(results);
    });
});

module.exports = router;
