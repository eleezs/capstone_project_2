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

// get Property by Id
router.get('/one_advert', asyncHandler(property.getPropertyById))

// update proerty
router.put('/one_advert/update',verifyToken, dataUpload, asyncHandler(property.updatePropertyDetails));




module.exports = router