const asyncWrapper = require("../middleware/asyncWrapper");
const userModel = require("../model/user");
const { generateToken } = require("../utility/jwt");


const signUp = asyncWrapper(async(req,res)=>{
     const {email,password} = req.body;
     if(!email || !password)
         throw new Error('Please provide require data');
    const createNewUser = await userModel.create({email,password});
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
    res.json({success: true,message: 'Login successfully',token});
})


module.exports = {signUp,singIn};