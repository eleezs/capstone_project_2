const express = require('express')
const router = express.Router();

const userRouter = require('./auth');
const propertyRouter = require('./property');

// for user route
router.use('/auth', userRouter);

// for property
router.use('/property', propertyRouter);

module.exports = router