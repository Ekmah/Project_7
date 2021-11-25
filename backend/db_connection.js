const mysql = require('mysql');
const db_connection = mysql.createConnection({
    host: 'localhost',
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DATABASE}`
  });
  db_connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
  });

  module.exports = db_connection