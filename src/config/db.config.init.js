const mysql = require('mysql');
const { logger } = require('../helper/logger');
require('dotenv').config();

const { DB_HOST, DB_USER, DB_PWD } = process.env;

const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PWD
});

connection.connect((err) => {
    if (err) logger.error(err.message);
});

module.exports = connection;