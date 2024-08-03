const asyncWrapper = require("../middleware/asyncWrapper");
const userModel = require("../model/user");
const { generateToken } = require("../utility/jwt");


const signUp = asyncWrapper(async(req,res)=>{
     const {email,password,username} = req.body;
     if(!email || !password || !username)
         throw new Error('Please provide require data');
    const createNewUser = await userModel.create({email,password,username});
    res.json({success: true,message: "user create successfully",User: createNewUser});
});

const singIn = asyncWrapper(async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password)
        throw new Error('Please provide require data');
    const user = await userModel.findOne({email});
    if(!user){
        throw new Error('Email not found')
    }
    const isValidPassword = await user.matchPassword(password);
    if(!isValidPassword){
        throw new Error("Invalid password");
    }
    const token = generateToken({payload: {id: user._id}});
    const userData = {email: user.email,id: user._id};
    res.status(200).cookie('access-token',token,{
        httpOnly: true
    }).json({success: true,message: 'login successfully',userData});
})


module.exports = {signUp,singIn};