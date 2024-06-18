const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const registerRouter = require('./routes/register');
const patientsRouter = require('./routes/patients');
const clinicalRecordsRouter = require('./routes/clinicalrecords');
const queueRouter = require('./routes/queue');
const reportsRouter = require('./routes/reports');
const closureRouter = require('./routes/closure');

const app = express();
const port = 3000;

// Conectar a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  database: 'medifiles',
  user: 'root',
  password: ''
});

connection.connect(function(err) {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  } else {
    console.log('Connected to the MySQL database');
  }
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use(express.static('public'));

// Rutas para usuarios
app.use('/users', registerRouter);

// Otras rutas (pacientes, historias clínicas, cola, reportes, cierre) pueden ser definidas aquí de manera similar
app.use('/patients', patientsRouter);
app.use('/clinicalrecords', clinicalRecordsRouter);
app.use('/queue', queueRouter);
app.use('/reports', reportsRouter);
app.use('/closure', closureRouter);

// Ruta predeterminada
app.get('/', (req, res) => {
  res.send('Welcome to the medical records system');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
