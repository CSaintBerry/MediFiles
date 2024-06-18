const db = require('../app');

exports.createUser = (userData, callback) => {
  const query = 'INSERT INTO users SET ?';
  console.log('Datos para insertar:', userData); // Para depuración
  db.query(query, userData, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result);
  });
};

exports.getUserByUsername = (username, callback) => {
  const query = 'SELECT * FROM users WHERE usuario = ?';
  db.query(query, [username], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result[0]);
  });
};
