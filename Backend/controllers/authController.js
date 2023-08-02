

const { hashPassword, comparePassword } = require('../helpers/authHelper')
const UserModel  = require('../models/userModel')

const jwt = require('jsonwebtoken')

 const registerController = async(req,res)=>{
    try{
  const {name,email,password,phone,address} = req.body

  if(!name){
    return res.send({error: 'Name is required'})
  }
  if(!email){
    return res.send({error: 'Email is required'})
  }
  if(!password){
    return res.send({error: 'Password is required'})
  }
  if(!phone){
    return res.send({error: 'Phone is required'})
  }
  if(!address){
    return res.send({error: 'address is required'})
  }

  const exisitinguser = await UserModel.findOne({email})

  if(exisitinguser){
    return res.status(200).send({
        success:true,
        message:"Already ragister please login"
    })
  }

  const hashedPassword = await hashPassword(password)
  const user = new UserModel({
    name,
    email,
    phone,
    address,
    password:hashedPassword}).save()
    return res.status(200).send({ success:"true",user})
    }
    catch(err){
        res.status(500).send({
            success:false,
            message:'Error in rgistration'
        })
    }
}



const loginController = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(404).send({
          success: false,
          message: "invalid email and password",
        });
      }
  
      const user = await UserModel.findOne({ email }); // Use findOne instead of find
      if (!user) {
        return res
          .status(404)
          .send({ success: false, message: "email is not registered" });
      }
  
      const match = await comparePassword(password, user.password);
      if (!match) {
        return res.status(404).send({
          success: false,
          message: "Invalid Password",
        });
      }
  
      // Generate Token
      const token = await jwt.sign({ _id: user._id }, process.env.jwt_secret_key,{expiresIn:"7d"});
      res.send({
        success: true,
        message: "login successfully",
        token: token,
        userId: user._id,
        user: {
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
      });
    } catch (err) {
      res.status(400).send({
        success: false,
        message: "error in login",
      });
    }
  };

  const testController = (req,res)=>{
    res.send("Protect routes")
  }

  module.exports = {
    registerController,
    loginController,
    testController
  };