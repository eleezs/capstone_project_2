const express = require('express');
const cors = require('cors');
const multer= require("multer");
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const db = require('./config/db.config');
const { httpLogStream } = require('./helper/logger');

const routerV1 = require('./routes/index.js');
const response = require("./helper/response");

const server = express()

  

server.use(cors())
server.use(cookieParser())
server.use(express.json());
server.use(express.urlencoded({extended : false}));
server.use(morgan('combined', { stream: httpLogStream }));
server.use(express.static(__dirname + '/public'));

server.use('/api/v1', routerV1)

server.use('/', (req, res) => {
  return response(res, true, 200, 'HOPE REAL ESTATE API')
});

server.use("/*", (req, res) => {
    return response(res, false, 404, "There was no resource for this request");
  });

const PORT = process.env.PORT;
server.listen(PORT, () =>{
    console.log(`server is running on port ${3000}`)
})