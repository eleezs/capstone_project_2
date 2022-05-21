const express = require('express');
const router =  express.Router();
const  {userValidator, 
    validate, 
    loginValidator 
} = require ('../middleware/validator.js')
const auth = require('../controllers/auth.js')
const { asyncHandler } = require('../middleware/asyncHandler')
const checkEmail = require('../middleware/checkEmail');

// create user
router.post('/user/sign_up', validate(userValidator), asyncHandler(checkEmail), asyncHandler(auth.signUp));

// login
router.post('/user/login', validate(loginValidator), asyncHandler(auth.login));

// logout
router.post('/user/signout', asyncHandler(auth.logout))
module.exports = router