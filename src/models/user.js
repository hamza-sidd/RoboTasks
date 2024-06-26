const mongoose=require("mongoose");
const validator=require("validator")
const sharp=require("sharp")
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const Task=require('./task')

const userSchema=new mongoose.Schema({
  email:{
    unique:true,
    type:String,
    trim:true,
    lowercase:true,
    validate(value){
     if(!validator.isEmail(value)){
       throw new Error('INVALID EMAIL')
     }
    }
 },
 name:{
   type:String,
   trim:true,
   required:true,
 },
 description:{
   type:String
 },
 age:{
   type:Number,
   default:0,
   validate(value){
     if(value<0){
       throw new Error('AGE MUST BE POSITIVE')
     }
   }
 },

 password:{
   type:String,
   required:true,
   minLength:7,
   trim:true,
   validate(val){
     if(val.includes('password')){
       throw new Error('invalid password');
     }
   }
 },
 tokens:[{
     token:{
      type:String,
      required:true
     }
 }],
 avatar:{
  type:Buffer
 }
},{
  timestamps:true
})

userSchema.virtual('tasks',{
  ref:'Task',
  localField:'_id',
  foreignField:'owner'
})

userSchema.methods.toJSON=function(){
  const user=this
  const userObject=user.toObject()
  
  delete userObject.password
  delete userObject.tokens
  delete userObject.avatar

  return userObject
}
userSchema.methods.generateOurToken=async function() {
  const user=this
  const token=jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET)
  user.tokens=user.tokens.concat({token})
  await user.save()
  return token
}
userSchema.statics.findByCredentials=async(email,password)=>{
  const user=await User.findOne({email})

  if(!user){
    throw new Error('unable to login')
  }

  const isMatch=await bcrypt.compare(password,user.password)
  if(!isMatch){
    throw new Error('unable to login')
  }

  return user
}

//hash password before saving
userSchema.pre('save',async function(next){
  const user=this
 
  if(user.isModified('password')){
    user.password=await bcrypt.hash(user.password,8)
  }
  next()
})

//Delete user tasks when user is removed
userSchema.pre('remove',async function(next){
  const user=this
  Task.deleteMany({owner:user._id})

  next()
})



const User=mongoose.model("User",userSchema);

  module.exports=User
  