const express = require('express');
const router =  express.Router();
const verifyToken = require('../middleware/verifyToken');
const { asyncHandler } = require('../middleware/asyncHandler');
const property = require('../controllers/property');
const dataUpload = require('../middleware/dataUpload');
const  {propertyValidator, validate} = require ('../middleware/validator');
// create property
router.post('/create_advert', verifyToken, validate(propertyValidator),dataUpload, asyncHandler(property.createProperty));

// view all data
router.get('/all_adverts', asyncHandler(property.fetchAllData));


module.exports = router