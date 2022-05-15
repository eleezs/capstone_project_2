require('dotenv').config()
const DB_NAME = process.env.DB_DB

const createDB = `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`;

const dropDB = `DROP DATABASE IF EXISTS ${DB_NAME}`;

const createTableUSers = `
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phoneNumber INT(15) NOT NULL,
    address VARCHAR(255) NULL,
    created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
)
`;

const createTablePropertys = `
CREATE TABLE IF NOT EXISTS propertys (
    property_id INT PRIMARY KEY AUTO_INCREMENT,
    item VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Available',
    price FLOAT NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    update_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    user_id INT,
    CONSTRAINT fk_users FOREIGN KEY (user_id) 
    REFERENCES users(id)
)
`;

const createNewUser = `
INSERT INTO users VALUES(null, ?, ?, ?, ?, ?, ?, NOW())
`;

const createNewProperty = `
INSERT INTO propertys(property_id, item, type, status, price, address, city, state, image_url, created_on, update_at, user_id) 
VALUES(null, ?, ?, DEFAULT, ?, ?, ?, ?, ?, NOW(), NOW(), ?)
`;

const findUserByEmail = `
SELECT * FROM users WHERE email = ?
`;

module.exports = {
    createDB,
    dropDB,
    createTableUSers,
    createTablePropertys,
    createNewProperty,
    createNewUser,
    findUserByEmail
};
