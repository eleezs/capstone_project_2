const jwt = require('jsonwebtoken');
const { logger } = require('../helper/logger');
require('dotenv').config()


const generateToken= (id) => jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '1d'});
 
const decodeToken = (token) => {
  try{
    return jwt.verify(token, process.env.JWT_SECRET)
  }
  catch(err){
    logger.error(err);
  }
};

module.exports = {
  generateToken,
  decodeToken
}
