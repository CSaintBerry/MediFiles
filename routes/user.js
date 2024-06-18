const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('../app');

// Ruta para crear un nuevo usuario
router.post('/register', async (req, res) => {
  const { nombre, apellido, cedula, direccion, numero_colegio_medico, numero_telefono, email, usuario, contraseña, tipo_usuario } = req.body;

  const hashedPassword = await bcrypt.hash(contraseña, 10);

  const query = 'INSERT INTO users (nombre, apellido, cedula, direccion, numero_colegio_medico, numero_telefono, email, usuario, contraseña, tipo_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(query, [nombre, apellido, cedula, direccion, numero_colegio_medico, numero_telefono, email, usuario, hashedPassword, tipo_usuario], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send({ success: true, message: 'Usuario registrado exitosamente' });
  });
});

// Ruta para autenticar un usuario
router.post('/login', (req, res) => {
  const { usuario, contraseña } = req.body;

  const query = 'SELECT * FROM users WHERE usuario = ?';
  connection.query(query, [usuario], async (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(401).send({ success: false, message: 'Usuario o contraseña incorrectos' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(contraseña, user.contraseña);

    if (!isMatch) {
      return res.status(401).send({ success: false, message: 'Usuario o contraseña incorrectos' });
    }

    res.status(200).send({ success: true, message: 'Usuario autenticado', user });
  });
});

module.exports = router;

