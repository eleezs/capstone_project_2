const User = require('../models/user');
const bcrypt = require('bcrypt')
const response = require('../helper/response')
const {generateToken} = require('../helper/token.js');
const checkEmail = require('../middleware/checkEmail');



const signUp = async(req, res) => {
  
  try{
    const { firstname, email, password, lastname,
      phoneNumber, address,
    } = req.body;

    // hash password
    const salt = 10;
    let hashedPassword = await bcrypt.hash(password, salt);

    const user = new User(firstname, lastname, email, hashedPassword, phoneNumber, address);

    // check if email exist
    // let presentEmail = checkEmail(email)
    // console.log(presentEmail)
    // if(presentEmail){
    //   return response( false, 400, `A user with email address '${email}' already exits`)   

    // }

    // save to table

    User.create(user, (err, data) => {
      if (err) {
        return //response(res, false, 500, {message:err.message})
      } 
      return response(res, true, 200, "User created successfully", {data})  
      
    });
    
  }
  catch(err){
    console.log(err)
  }
}

/**
 * login
 * @returns accessToken
 */

const login = async(req, res) => {
  try{
    const {email, password} = req.body;

    // check if email exist
  
    User.findByEmail(email, async(err, data) => {
    if (err) {
      if (err.kind === "not_found") {
          return response (res,false, 404, `User with email ${email} was not found`)
      }
    }
    if(data){
      const comparePassword = await bcrypt.compare(password, data.password) 
      if(!comparePassword){
        return response(res, false, 401, 'Your email or password combination is incorrect');  
      }
    }
    const token = generateToken(data.id);
    response(res, true, 200, 'Login successful', {token, data})
    })
  }
  catch(err){
    console.log(err)
  }
}


module.exports = {
  signUp,
  login
}