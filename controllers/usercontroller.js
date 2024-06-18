const userModel = require('../models/usermodel');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  const { nombre, apellido, cedula, direccion, numero_colegio_medico, numero_telefono, email, usuario, contraseña, tipo_usuario } = req.body;

  console.log('Datos recibidos:', req.body); // Para depuración

  try {
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const userData = { nombre, apellido, cedula, direccion, numero_colegio_medico, numero_telefono, email, usuario, contraseña: hashedPassword, tipo_usuario };

    userModel.createUser(userData, (err, result) => {
      if (err) {
        console.error('Error inserting user into database:', err);
        return res.status(500).send({ success: false, message: 'Error al registrar el usuario', error: err });
      }
      res.status(201).send({ success: true, message: 'Usuario registrado exitosamente' });
    });
  } catch (err) {
    console.error('Error hashing password:', err);
    res.status(500).send({ success: false, message: 'Error al registrar el usuario', error: err });
  }
};

exports.login = (req, res) => {
  const { usuario, contraseña } = req.body;

  userModel.getUserByUsername(usuario, async (err, user) => {
    if (err) {
      console.error('Error querying user from database:', err);
      return res.status(500).send({ success: false, message: 'Error al autenticar el usuario', error: err });
    }
    if (!user) {
      return res.status(401).send({ success: false, message: 'Usuario o contraseña incorrectos' });
    }

    const isMatch = await bcrypt.compare(contraseña, user.contraseña);

    if (!isMatch) {
      return res.status(401).send({ success: false, message: 'Usuario o contraseña incorrectos' });
    }

    res.status(200).send({ success: true, message: 'Usuario autenticado', user });
  });
};


