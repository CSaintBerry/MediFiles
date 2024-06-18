const mysql = require('mysql');

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

module.exports = connection;
