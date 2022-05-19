const express = require('express');
const reportRouter =  express.Router();
const dataUpload = require('../middleware/dataUpload');
const report = require('../controllers/report');
const  {reportValidator, validate} = require ('../middleware/validator');
const { asyncHandler } = require('../middleware/asyncHandler');

// Report Advert
reportRouter.post('/advert',validate(reportValidator), dataUpload, asyncHandler(report.createReport));

module.exports = reportRouter