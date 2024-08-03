const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET
const generateToken = ({payload}) => {
    return jwt.sign(payload,jwtSecret);
}

const verifyToken = (token) => {
   try{
    const payload = jwt.verify(token,jwtSecret);
    return {success: true,message: 'token verify successfully',payload};
   }catch(error){
    return {success: false,message: error.message};
   }
}

module.exports = {generateToken,verifyToken};