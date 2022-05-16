const User = require('../models/user');
const bcrypt = require('bcrypt')
const response = require('../helper/response')
const {generateToken} = require('../helper/token.js');
const checkEmail = require('../middleware/checkEmail');
const { cookie } = require('express/lib/response');



const signUp = async(req, res) => {
  
  try{
    const { firstname, email, password, lastname,
      phoneNumber, address,
    } = req.body;

    // hash password
    const salt = 10;
    let hashedPassword = await bcrypt.hash(password, salt);

    const user = new User(firstname, lastname, email, hashedPassword, phoneNumber, address);

    // save to table

    User.create(user, (err, data) => {
      if (err) {
        return 
      } 
      // const token = generateToken(data.id, data.email)
      return response(res, true, 200, "User created successfully")
      
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
      const token = generateToken(data.id, data.email);
      return res.cookie("access_token", token,{
        httpOnly: true,
        secure: process.env.NODE_ENV ==="production"
      }).status(200).json({message:"Login successful"})
    })   
  }
  catch(err){
    console.log(err)
  }
}

/**
 * logout
 */

 const logout= (req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out" });
};


module.exports = {
  signUp,
  login,
  logout
}