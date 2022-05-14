const response  = require('../helper/response');
const User = require('../models/user');

const checkEmail =  (req, res, next) =>{ 
    const { email } = req.body;
    User.findByEmail(email, (_, data)=> {  
        if (data) {
            response(res, false, 400, `A user with email address ${email} already exits`)   
            // return;
        }   
    });
   next()

};

module.exports = checkEmail;