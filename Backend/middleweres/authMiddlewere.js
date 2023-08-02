

 const jwt = require('jsonwebtoken')
const UserModel = require('../models/userModel')


 const requireSignIn = async(req,res,next)=>{
    try{
  const decode = jwt.verify(req.headers.authorization,process.env.jwt_secret_key );
  req.user = decode
  next()
    }
   
    catch(err){
        console.log("err",err)
    }
 }

  //Admin access ///

   const isAdmin = async(req,res,next)=>{
    try{
   const user = await UserModel.findById(req.user._id);

   if(user.role !== 1){
    return res.status(401).send({success:false, message:"UnAuthorised Acess"})
   }
   else{
    next()
   }
    }
    catch(err){

    }
   }

 module.exports = {requireSignIn , isAdmin}