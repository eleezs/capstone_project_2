const express = require('express');
const router =  express.Router();
const verifyToken = require('./middleware/verifyToken');
const { asyncHandler } = require('../middleware/asyncHandler');
const property = require('../controllers/property');
const dataUpload = require('../middleware/dataUpload');
const  {propertyValidator, validate} = require ('../middleware/validator');
// create property
router.post('/create_advert', verifyToken, validate(propertyValidator), dataUpload, asyncHandler(property.createProperty));

// login
// router.post('/login', validate(loginValidator), asyncHandler(auth.login));


module.exports = router