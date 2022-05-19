const express = require('express')
const router = express.Router();

const userRouter = require('./auth');
const propertyRouter = require('./property');
const reportRouter = require('./report');

// for user route
router.use('/auth', userRouter);

// for property
router.use('/property', propertyRouter);

// for Report
router.use('/report', reportRouter);

module.exports = router