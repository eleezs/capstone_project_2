const mysql = require('mysql');
const { logger } = require('../helper/logger');
require('dotenv').config()

// createPool

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_DB
});

connection.connect(function(err) {
  if (err) logger.error(err.message);
  else logger.info('Database Connected')
});

// module.exports = pool;
module.exports = connection