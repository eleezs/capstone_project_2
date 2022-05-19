const express = require('express');
const router =  express.Router();
const verifyToken = require('../middleware/verifyToken');
const { asyncHandler } = require('../middleware/asyncHandler');
const property = require('../controllers/property');
const dataUpload = require('../middleware/dataUpload');
const  {propertyValidator, validate} = require ('../middleware/validator');
// create property
router.post('/create_advert', verifyToken,dataUpload, asyncHandler(property.createProperty));

// view all data
router.get('/all_adverts', asyncHandler(property.fetchAllData));

// get Property by Id
router.get('/one_advert/:id', asyncHandler(property.getPropertyById))

// update property
router.put('/one_advert/update',verifyToken, dataUpload, asyncHandler(property.updatePropertyDetails));

// update status
router.put('/update/one_advert/:id',verifyToken, dataUpload, asyncHandler(property.updateSoldItem));

// delete property
router.delete('/advert/delete/:id', verifyToken, asyncHandler(property.deleteSingleProperty));

// search property
router.get('/search/advert', asyncHandler(property.queryProperty))

module.exports = router 