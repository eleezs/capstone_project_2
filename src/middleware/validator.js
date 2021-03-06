const {check, validationResult} = require('express-validator')
const response = require("../helper/response");

const validate = (values = []) => {
  return async (req, res, next) => {
    await Promise.all(values.map((value) => value.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    let _errors = errors.array();
    let message = "Invalid parameters:";

    _errors.forEach((v) => {
      message += ` ${v.param},`;
    });

    return response(res, false, 400, { errors: errors.array() });
  };
};

const userValidator = 
  [
    check('firstname', 'FirstName Must not be empty').notEmpty().trim(),
    check('email', 'Email Must not be empty').notEmpty().trim().normalizeEmail().isEmail(),
    check('password', 'Password Must not be empty or less than 8').notEmpty().isLength({min:8}).trim(),
    check('phoneNumber', 'Input Phone number').notEmpty().isNumeric().trim(),
    check('address', 'Address should not be empty').notEmpty(),
    check('lastname', 'lastName Must not be empty').notEmpty().trim(),
  ]  

const loginValidator = 
[
  check('email', 'Email Must not be empty').notEmpty().trim().normalizeEmail().isEmail(),
  check('password', 'Input Password ').notEmpty().isLength({min:8}).trim()
];

const propertyValidator =
[
  check('files', 'Please upload file').not().isEmpty(),
  check('item', 'Please Input item Name').isString(),
  // check('type', 'Please select type category').notEmpty().isString(),
  // check('price', 'How much does it go for?').notEmpty().isString(),
  // check('address', 'Input address').notEmpty().isString(),
  // check('city', 'Select City').notEmpty().isString(),  
  // check('state', 'Select State').notEmpty().isString(),  
];

const reportValidator = 
[
  check('reason', 'What is your reason').notEmpty(),
  check('description', 'Kindly Explain').notEmpty()
]


module.exports = {
  validate,
  userValidator,
  loginValidator,
  propertyValidator,
  reportValidator
}