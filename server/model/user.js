const mongoose = require( "mongoose");
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    email: {type: 'String',required: true},
    password: {type: 'String',required: true}
})

UserSchema.methods.matchPassword = async function(enterPassword){
   return await bcrypt.compare(enterPassword,this.password);
}

UserSchema.pre('save',async function(next){
   if(!this.isModified('password')){
    next();
   }
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password,salt);
})

module.exports = mongoose.model('User',UserSchema);